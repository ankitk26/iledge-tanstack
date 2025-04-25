import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { unionAll } from "drizzle-orm/pg-core";
import { db } from "~/db";
import { category, expense } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";

export const getMonthComparison = createServerFn({ method: "GET" }).handler(
  async () => {
    const currentMonth = sql`DATE_TRUNC('month', ${nowTz})`;
    const previousMonth = sql`DATE_TRUNC('month', ${nowTz}) - INTERVAL '1 month'`;

    const currentQuery = db
      .select({ month_date: sql<Date>`${currentMonth}`.as("month_date") })
      .from(category)
      .limit(1);

    const previousQuery = db
      .select({ month_date: sql<Date>`${previousMonth}`.as("month_date") })
      .from(category)
      .limit(1);

    const targetMonths = db
      .$with("target_months")
      .as(unionAll(currentQuery, previousQuery));

    return db
      .with(targetMonths)
      .select({
        month_date: sql<string>`${targetMonths.month_date}`,
        amount: sql<number>`COALESCE(SUM(${expense.amount}), 0)::float`,
      })
      .from(targetMonths)
      .leftJoin(
        expense,
        eq(
          sql`DATE_TRUNC('month', ${transactionDateTz})`,
          targetMonths.month_date
        )
      )
      .groupBy(targetMonths.month_date)
      .orderBy(targetMonths.month_date);
  }
);
