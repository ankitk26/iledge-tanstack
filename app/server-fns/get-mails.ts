import { createServerFn } from "@tanstack/react-start";
import * as cheerio from "cheerio";
import { eq, max } from "drizzle-orm";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { db } from "~/db";
import { expense } from "~/db/schema";
import { getUser } from "./get-user";

type ParsedMail = {
  upi_ref_no: string;
  sender_upi_id: string;
  payee_upi_id: string;
  payee_name: string;
  amount: number;
  transaction_date: string;
};

export const getMailIds = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    const client = new ImapFlow({
      host: process.env.SMTP_SERVER || "imap.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "993"),
      secure: true,
      auth: {
        user: process.env.USER!,
        pass: process.env.USER_PASSWORD!,
      },
    });

    try {
      await client.connect();
      await client.mailboxOpen("[Gmail]/All Mail", { readOnly: true });

      const latestDate = await db
        .select({ latestDate: max(expense.transaction_date) })
        .from(expense)
        .where(eq(expense.user_id, user.id))
        .then((data) => data[0].latestDate);

      const messageIds = await client.search({
        since: latestDate ?? new Date(),
        from: process.env.CHECK_MAIL,
      });

      if (!messageIds.length) {
        await client.logout();
        return { message: "No messages found", messageIds: [] };
      }

      const messages = client.fetch(
        { seq: messageIds.join(",") },
        { source: true }
      );
      const parsedMails: ParsedMail[] = [];

      for await (const message of messages) {
        const parsedEmail = await simpleParser(message.source!);
        const $ = cheerio.load(parsedEmail.html || "");
        const spans = $("span.gmailmsg");

        spans.each((_, span) => {
          const spanText = $(span).text();
          if (
            !spanText.includes("UPI Ref. No.") ||
            spanText.includes("Transaction Status: FAILED")
          ) {
            return;
          }

          const lines = $(span).html()?.split("<br>") || [];
          const data: Partial<ParsedMail> = {};

          for (const line of lines) {
            const clean = line.trim();
            if (!clean.includes(":") || clean.startsWith("<")) continue;

            const [key, val] = clean.split(":", 2).map((s) => s.trim());

            switch (key) {
              case "UPI Ref. No.":
                data.upi_ref_no = val;
                break;
              case "From VPA":
                data.sender_upi_id = val;
                break;
              case "To VPA":
                data.payee_upi_id = val;
                break;
              case "Payee Name":
                data.payee_name = val;
                break;
              case "Amount":
                data.amount = parseFloat(val.replace(/[^\d.]/g, ""));
                break;
              case "Transaction Date":
                data.transaction_date =
                  parsedEmail.date?.toISOString() ?? "unknown";
                break;
            }
          }

          if (
            data.upi_ref_no &&
            data.sender_upi_id &&
            data.payee_upi_id &&
            data.payee_name &&
            typeof data.amount === "number" &&
            data.transaction_date
          ) {
            parsedMails.push(data as ParsedMail);
          }
        });
      }

      await client.logout();
      return parsedMails;
    } catch (error) {
      console.error("IMAP error:", error);
      await client.logout();
    }
  }
);
