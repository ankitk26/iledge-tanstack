import { createServerFn } from "@tanstack/react-start";
import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { nowTz, transactionDateTz } from "~/lib/get-time-zone-dates";

export const getPayeeDailyTotals = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payees: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const currentMonth = sql`DATE_TRUNC('month', ${nowTz})`;
    const payeeIds = data.payees.split(",").map((p) => parseInt(p));

    return db
      .select({
        day: sql<string>`TO_CHAR(DATE_TRUNC('day', ${transactionDateTz}), 'DD')`,
        amount: sql<number>`sum(expense.amount)::float`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(
        and(
          inArray(expense.payee_id, payeeIds),
          gte(sql`DATE_TRUNC('month', ${transactionDateTz})`, currentMonth)
        )
      )
      .groupBy(sql`DATE_TRUNC('day', ${transactionDateTz})`);
  });
