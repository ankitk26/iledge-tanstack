import { createServerFn } from "@tanstack/react-start";
import { eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { transactionDateTz } from "~/lib/get-time-zone-dates";

export const getPayeeMonthlyTotals = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payees: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const payeeIds = data.payees.split(",").map((p) => parseInt(p));

    return db
      .select({
        monthDate: sql<string>`DATE_TRUNC('month', ${transactionDateTz})`,
        amount: sql<number>`sum(expense.amount)::float`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(inArray(expense.payee_id, payeeIds))
      .groupBy(sql`DATE_TRUNC('month', ${transactionDateTz})`)
      .orderBy(sql`DATE_TRUNC('month', ${transactionDateTz})`);
  });
