import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { expense } from "@/db/schema";
import { transactionDateTz } from "@/lib/get-time-zone-dates";
import { getUser } from "./get-user";

export const getMonthlyTotals = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = await getUser();
		if (!user) {
			throw new Error("Invalid User");
		}

		return db
			.select({
				month_date: sql<string>`DATE_TRUNC('month', ${transactionDateTz})`,
				amount: sql<number>`round(SUM(amount))::float`,
			})
			.from(expense)
			.where(eq(expense.user_id, user.id))
			.groupBy(sql`DATE_TRUNC('month', ${transactionDateTz})`)
			.orderBy(sql`DATE_TRUNC('month', ${transactionDateTz})`);
	},
);
