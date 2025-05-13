import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "~/db";
import { expense } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";
import { getUser } from "./get-user";

export const getDailyTotals = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    // truncate current day to month. Example - 23-apr-2025 1400 hours will give 1-apr-2025 0000 hours
    const monthStart = sql`DATE_TRUNC('month', ${nowTz})`;

    // truncate current day to month and add 1 month. Example - 23-apr-2025 1400 hours will give 1-may-2025 0000 hours
    const monthEnd = sql`DATE_TRUNC('month', ${nowTz}) + INTERVAL '1 month'`;

    // truncate current day to day. Example - 23-apr-2025 1400 hours will give 23-apr-2025 0000 hours
    const transactionDateDay = sql`DATE_TRUNC('day', ${transactionDateTz})`;

    return db
      .select({
        day: sql<string>`TO_CHAR(${transactionDateDay}, 'DD')`,
        amount: sql<number>`round(sum(expense.amount))::float`,
      })
      .from(expense)
      .where(
        and(
          gte(transactionDateTz, monthStart),
          lt(transactionDateTz, monthEnd),
          eq(expense.user_id, user.id)
        )
      )
      .groupBy(transactionDateDay)
      .orderBy(transactionDateDay);
  }
);
