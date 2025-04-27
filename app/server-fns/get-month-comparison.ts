import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, sql } from "drizzle-orm";
import { db } from "~/db";
import { expense } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";
import { getUser } from "./get-user";

export const getMonthComparison = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    const currentMonth = sql`DATE_TRUNC('month', ${nowTz})`;
    const previousMonth = sql`DATE_TRUNC('month', ${nowTz}) - INTERVAL '1 month'`;

    return db
      .select({
        currentMonthSpent: sql<number>`
              COALESCE(SUM(CASE WHEN DATE_TRUNC('month', ${transactionDateTz}) = ${currentMonth} THEN expense.amount END), 0)::float
            `,
        previousMonthSpent: sql<number>`
              COALESCE(SUM(CASE WHEN DATE_TRUNC('month', ${transactionDateTz}) = ${previousMonth} THEN expense.amount END), 0)::float
            `,
      })
      .from(expense)
      .where(
        and(gte(transactionDateTz, previousMonth), eq(expense.user_id, user.id))
      );
  }
);
