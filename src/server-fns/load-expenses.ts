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
	amount: string;
	transaction_date: Date;
};

type NewPayee = Pick<ParsedMail, "payee_upi_id" | "name"> & { user_id: string };

export const loadExpenses = createServerFn({ method: "POST" }).handler(
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
				user: process.env.EMAIL_USER as string,
				pass: process.env.EMAIL_USER_PASSWORD as string,
			},
		});

		try {
			// Connect to imap client
			await client.connect();
			await client.mailboxOpen("[Gmail]/All Mail", { readOnly: true });

			// Get date after which emails will be processed
			const latestDateRows = await db
				.select({ latestDate: max(expense.transaction_date) })
				.from(expense)
				.where(eq(expense.user_id, user.id));

			const latestDate = latestDateRows[0]?.latestDate;

			if (!latestDate) {
				return {
					message: "No expenses added yet. Please do a full load",
				};
			}

			const now = new Date();
			const startOfCurrentMonth = new Date(
				now.getFullYear(),
				now.getMonth(),
				1,
			);

			// Get list of all mail IDS
			const mailIds = await client.search({
				since: latestDate ?? startOfCurrentMonth,
				from: process.env.CHECK_MAIL,
			});

			// Return empty list if no mails are found
			if (!mailIds || !mailIds.length) {
				await client.logout();
				return { message: "No new mails found" };
			}

			// Get mail content for all mail IDs
			const mailIterableList = client.fetch(
				{ seq: mailIds.join(",") },
				{ source: true },
			);

			// Initialize list of parsed mails
			const parsedMails: ParsedMail[] = [];

			// Initialize list of payees
			const newPayeeMap = new Map<string, NewPayee>();

			// Parse the comma-separated string of IDs into an array for easier checking
			const userIds =
				process.env.IDS?.split(",").map((id) => id.trim()) || [];

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
						.filter(
							(line) =>
								line.includes(":") && !line.startsWith("<"),
						);

					for (const line of filteredLines) {
						// Get key-value pairs splitted by ":"
						const [key, val] = line
							.split(":", 2)
							.map((s) => s.trim());

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
								currentMailData.amount = val;
								break;
							case "Transaction Date":
								currentMailData.transaction_date =
									parsedEmail.date ?? new Date();
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
						currentMailData.amount
					) {
						// Check if payee is current user
						const isPaidToMe = userIds.some((id) =>
							currentMailData.payee_upi_id?.includes(id),
						);

						// If yes, then invert amount's sign
						if (isPaidToMe) {
							currentMailData.amount =
								"-" + currentMailData.amount;
						}

						// Push mail data
						parsedMails.push(currentMailData as ParsedMail);

						// Push payee data
						newPayeeMap.set(currentMailData.payee_upi_id, {
							payee_upi_id: currentMailData.payee_upi_id,
							name: currentMailData.name,
							user_id: user.id,
						});
					}
				});
			}

			await client.logout();

			// Prepare data to be inserted for payees
			const newPayees = Array.from(newPayeeMap.values());

			// Upsert payees
			await db
				.insert(payee)
				.values(newPayees)
				.onConflictDoUpdate({
					target: payee.payee_upi_id,
					set: { name: sql`excluded.name` },
				});

			// Get all payees from DB
			const dbPayees = await db
				.select({ payee_upi_id: payee.payee_upi_id, id: payee.id })
				.from(payee)
				.where(eq(payee.user_id, user.id));

			// Build map
			const payeeIdMap = new Map(
				dbPayees.map((p) => [p.payee_upi_id, p.id]),
			);

			// Prepare data for insert
			const expensesToInsert = parsedMails.map((mail) => {
				const payeeId = payeeIdMap.get(mail.payee_upi_id);

				return {
					upi_ref_no: mail.upi_ref_no,
					sender_upi_id: mail.sender_upi_id,
					amount: mail.amount,
					transaction_date: mail.transaction_date,
					payee_id: payeeId ?? 0,
					user_id: user.id,
				};
			});

			// Insert rows into expense table. Do nothing if duplicate record is found
			const insertedRows = await db
				.insert(expense)
				.values(expensesToInsert)
				.onConflictDoNothing({ target: expense.upi_ref_no })
				.returning({ upi_ref_no: expense.upi_ref_no });

			if (insertedRows.length === 0) {
				return { message: "Data up-to date" };
			}

			return {
				message: "Expenses loaded successfully",
			};
		} catch (error) {
			console.error(error);
			await client.logout();
		}
	},
);
