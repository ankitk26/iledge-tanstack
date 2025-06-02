import { createServerFn } from "@tanstack/react-start";
import * as cheerio from "cheerio";
import { eq, max, sql } from "drizzle-orm";
import { ImapFlow } from "imapflow";
import { simpleParser } from "mailparser";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { getUser } from "./get-user";

type ParsedMail = {
  upi_ref_no: string;
  sender_upi_id: string;
  payee_upi_id: string;
  name: string;
  amount: number;
  transaction_date: string;
};

type NewPayee = Pick<ParsedMail, "payee_upi_id" | "name"> & { user_id: string };

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
      // Connect to imap client
      await client.connect();
      await client.mailboxOpen("[Gmail]/All Mail", { readOnly: true });

      // Get date after which emails will be processed
      const latestDate = await db
        .select({ latestDate: max(expense.transaction_date) })
        .from(expense)
        .where(eq(expense.user_id, user.id))
        .then((data) => data[0].latestDate);

      // Get list of all mail IDS
      const mailIds = await client.search({
        since: latestDate ?? new Date(),
        from: process.env.CHECK_MAIL,
      });

      // Return empty list if no mails are found
      if (!mailIds.length) {
        await client.logout();
        return [];
      }

      // Get mail content for all mail IDs
      const mailIterableList = client.fetch(
        { seq: mailIds.join(",") },
        { source: true }
      );

      // Initialize list of parsed mails
      const parsedMails: ParsedMail[] = [];

      // Initialize list of payees
      const newPayees: NewPayee[] = [];

      // Parse the comma-separated string of IDs into an array for easier checking
      const userIds = process.env.IDS?.split(",").map((id) => id.trim()) || [];

      for await (const mail of mailIterableList) {
        const currentMailData: Partial<ParsedMail> = {};

        // Parse mail body from Buffer
        const parsedEmail = await simpleParser(mail.source!);

        // Get html content of mail body
        const $ = cheerio.load(parsedEmail.html || "");

        // All required fields are wrapped in span with class="gmailmsg"
        // Get all such spans
        const spans = $("span.gmailmsg");

        spans.each((_, span) => {
          // Get text inside span
          const spanText = $(span).text();

          // If conditions are not satisfied, skip those spans
          if (
            !spanText.includes("UPI Ref. No.") ||
            spanText.includes("Transaction Status: FAILED")
          ) {
            return;
          }

          // Get expense lines
          const lines = $(span).html()?.split("<br>") || [];

          // Filter required lines
          const filteredLines = lines
            // trim each line
            ?.map((line) => line.trim())
            // filter out lines having ":" and not beginning with "<"
            .filter((line) => line.includes(":") && !line.startsWith("<"));

          for (const line of filteredLines) {
            // Get key-value pairs splitted by ":"
            const [key, val] = line.split(":", 2).map((s) => s.trim());

            // Insert key-value in "currentMailData" based on line's key
            switch (key) {
              case "UPI Ref. No.":
                currentMailData.upi_ref_no = val;
                break;
              case "From VPA":
                currentMailData.sender_upi_id = val;
                break;
              case "To VPA":
                currentMailData.payee_upi_id = val;
                break;
              case "Payee Name":
                currentMailData.name = val;
                break;
              case "Amount":
                // Parse string decimal value to number
                currentMailData.amount = parseFloat(val.replace(/[^\d.]/g, ""));
                break;
              case "Transaction Date":
                currentMailData.transaction_date =
                  parsedEmail.date?.toISOString() ?? new Date().toISOString();
                break;
            }
          }

          // Check if all fields are valid
          if (
            currentMailData.upi_ref_no &&
            currentMailData.sender_upi_id &&
            currentMailData.payee_upi_id &&
            currentMailData.name &&
            currentMailData.transaction_date &&
            typeof currentMailData.amount === "number"
          ) {
            // Check if payee is current user
            const isPaidToMe = userIds.some((id) =>
              currentMailData.payee_upi_id?.includes(id)
            );

            // If yes, then invert amount's sign
            if (isPaidToMe) {
              currentMailData.amount = -currentMailData.amount;
            }

            // Push mail data
            parsedMails.push(currentMailData as ParsedMail);

            // Push payee data
            newPayees.push({
              payee_upi_id: currentMailData.payee_upi_id,
              name: currentMailData.name,
              user_id: user.id,
            });
          }
        });
      }

      await client.logout();

      // Upsert payees
      await db
        .insert(payee)
        .values(newPayees)
        .onConflictDoUpdate({
          target: payee.payee_upi_id,
          set: { name: sql.raw("excluded.name") },
        });

      // await db.insert(expense).values(parsedMails);

      return {
        payees: newPayees,
        mailIterableList: parsedMails,
      };
    } catch (error) {
      console.error("IMAP error:", error);
      await client.logout();
    }
  }
);
