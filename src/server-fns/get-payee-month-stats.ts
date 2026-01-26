import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";
import { getUser } from "./get-user";

export const getPayeeMonthStats = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      payees: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    const currentMonth = sql`DATE_TRUNC('month', ${nowTz})`;
    const previousMonth = sql`DATE_TRUNC('month', ${nowTz}) - INTERVAL '1 month'`;
    const payeeIds = data.payees.split(",").map((p) => parseInt(p));

    const result = await db
      .select({
        currentMonthSpent: sql<number>`
          ROUND(COALESCE(SUM(CASE WHEN DATE_TRUNC('month', ${transactionDateTz}) = ${currentMonth} THEN expense.amount END), 0))::float
        `,
        previousMonthSpent: sql<number>`
          ROUND(COALESCE(SUM(CASE WHEN DATE_TRUNC('month', ${transactionDateTz}) = ${previousMonth} THEN expense.amount END), 0))::float
        `,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(
        and(
          inArray(expense.payee_id, payeeIds),
          gte(transactionDateTz, previousMonth),
          eq(expense.user_id, user.id),
          eq(payee.user_id, user.id),
        ),
      );

    return result[0];
  });
