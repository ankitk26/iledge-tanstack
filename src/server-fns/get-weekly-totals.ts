import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, lt, sql } from "drizzle-orm";

import { db } from "~/db";
import { expense } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";

import { getUser } from "./get-user";

export const getWeeklyTotals = createServerFn({ method: "GET" }).handler(
	async () => {
		const user = await getUser();
		if (!user) {
			throw new Error("Invalid User");
		}

		// truncate current day to month. Example - 23-apr-2025 1400 hours will give 1-apr-2025 0000 hours
		const monthStart = sql`DATE_TRUNC('month', ${nowTz})`;

		// truncate current day to month and add 1 month. Example - 23-apr-2025 1400 hours will give 1-may-2025 0000 hours
		const monthEnd = sql`DATE_TRUNC('month', ${nowTz}) + INTERVAL '1 month'`;

		const weeklyAggregations = db.$with("weekly_aggregations").as(
			db
				.select({
					week_start:
						sql<Date>`DATE_TRUNC('week', ${transactionDateTz})`.as(
							"week_start",
						),
					amount: sql<number>`ROUND(SUM(${expense.amount}))::float`.as(
						"amount",
					),
				})
				.from(expense)
				.where(
					and(
						gte(transactionDateTz, monthStart),
						lt(transactionDateTz, monthEnd),
						eq(expense.user_id, user.id),
					),
				)
				.groupBy(sql`DATE_TRUNC('week', ${transactionDateTz})`),
		);

		return db
			.with(weeklyAggregations)
			.select({
				week: sql<string>`CONCAT('Week ', ROW_NUMBER() OVER (ORDER BY ${weeklyAggregations.week_start}))`,
				amount: weeklyAggregations.amount,
			})
			.from(weeklyAggregations)
			.orderBy(weeklyAggregations.week_start);
	},
);
