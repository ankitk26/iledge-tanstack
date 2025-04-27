import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";

export const getPayeeMonthStats = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payees: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const currentMonth = sql`DATE_TRUNC('month', ${nowTz})`;
    const previousMonth = sql`DATE_TRUNC('month', ${nowTz}) - INTERVAL '1 month'`;
    const payeeIds = data.payees.split(",").map((p) => parseInt(p));

    const result = await db
      .select({
        currentMonthSpent: sql<number>`
          COALESCE(SUM(CASE WHEN DATE_TRUNC('month', ${transactionDateTz}) = ${currentMonth} THEN expense.amount END), 0)::float
        `,
        previousMonthSpent: sql<number>`
          COALESCE(SUM(CASE WHEN DATE_TRUNC('month', ${transactionDateTz}) = ${previousMonth} THEN expense.amount END), 0)::float
        `,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(
        and(
          inArray(expense.payee_id, payeeIds),
          gte(transactionDateTz, previousMonth)
        )
      );

    return result[0];
  });
