import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "~/db";
import { expense } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";
import { getUser } from "./get-user";

export const getCurrentDayTotal = createServerFn({ method: "GET" }).handler(
  async () => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    // truncate current day. Example - 23-apr-2025 1400 hours will give 23-apr-2025 0000 hours
    const istDayStart = sql`DATE_TRUNC('day', ${nowTz})`;

    // truncate current day and add 1 day. Example - 23-apr-2025 1400 hours will give 24-apr-2025 0000 hours
    const istDayEnd = sql`DATE_TRUNC('day', ${nowTz}) + INTERVAL '1 day'`;

    return await db
      .select({
        amount: sql<number>`ROUND(COALESCE(SUM(${expense.amount}), 0))::float`,
      })
      .from(expense)
      .where(
        and(
          gte(transactionDateTz, istDayStart),
          lt(transactionDateTz, istDayEnd),
          eq(expense.user_id, user.id)
        )
      )
      .limit(1);
  }
);
