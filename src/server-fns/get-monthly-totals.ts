import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "~/db";
import { expense } from "~/db/schema";
import { transactionDateTz } from "~/lib/get-time-zone-dates";

export const getMonthlyTotals = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			id: z.string(),
		}),
	)
	.handler(({ data }) => {
		return db
			.select({
				month_date: sql<string>`DATE_TRUNC('month', ${transactionDateTz})`,
				amount: sql<number>`round(SUM(amount))::float`,
			})
			.from(expense)
			.where(eq(expense.user_id, data.id))
			.groupBy(sql`DATE_TRUNC('month', ${transactionDateTz})`)
			.orderBy(sql`DATE_TRUNC('month', ${transactionDateTz})`);
	});
