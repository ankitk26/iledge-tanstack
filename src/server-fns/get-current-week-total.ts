import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, lt, sql } from "drizzle-orm";

import { db } from "@/db";
import { expense } from "@/db/schema";
import { nowTz, transactionDateTz } from "@/lib/get-time-zone-dates";

import { getUser } from "./get-user";

export const getCurrentWeekTotal = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = await getUser();
		if (!user) {
			throw new Error("Invalid User");
		}
		// truncate current day to week. Example - 23-apr-2025 1400 hours will give 21-apr-2025 (Monday) 0000 hours
		const weekStart = sql`DATE_TRUNC('week', ${nowTz})`;

		// truncate current day to week and add 1 week. Example - 23-apr-2025 1400 hours will give 28-apr-2025 (Monday) 0000 hours
		const weekEnd = sql`DATE_TRUNC('week', ${nowTz}) + INTERVAL '1 week'`;

		return await db
			.select({
				amount: sql<number>`ROUND(COALESCE(SUM(${expense.amount}), 0))::float`,
			})
			.from(expense)
			.where(
				and(
					gte(transactionDateTz, weekStart),
					lt(transactionDateTz, weekEnd),
					eq(expense.user_id, user.id),
				),
			)
			.limit(1);
	},
);
