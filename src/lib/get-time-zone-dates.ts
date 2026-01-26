import { sql } from "drizzle-orm";

import { expense } from "@/db/schema";

// convert transaction_date to IST
export const transactionDateTz = sql`${expense.transaction_date} at time zone 'Asia/Kolkata'`;

// convert current timestamp to IST
export const nowTz = sql`NOW() AT TIME ZONE 'Asia/Kolkata'`;
