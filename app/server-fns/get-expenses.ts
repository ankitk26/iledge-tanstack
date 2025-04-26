import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { category, expense, payee } from "~/db/schema";
import { transactionDateTz } from "~/lib/get-time-zone-dates";

const fnParams = z.object({
  userId: z.string(),
  payeeId: z.number().optional(),
  month: z.number().min(1).max(12).optional(),
  year: z.number().optional(),
});

export type ExpensesQueryParams = z.infer<typeof fnParams>;

export const getExpenses = createServerFn({ method: "GET" })
  .validator(fnParams)
  .handler(async ({ data }) => {
    return db
      .select({
        id: expense.id,
        payee_id: expense.payee_id,
        payee_name: payee.name,
        payee_upi_id: payee.payee_upi_id,
        transaction_date: sql<string>`${transactionDateTz}`,
        amount: sql<number>`expense.amount::float`,
        category_id: category.id,
        category_description: category.description,
        category_icon: category.icon_name,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .innerJoin(
        category,
        sql`case when expense.category_id = 0 then payee.category_id else expense.category_id end = category.id`
      )
      .where(
        and(
          data.payeeId !== undefined ? eq(payee.id, data.payeeId) : sql`true`,
          data.month !== undefined
            ? sql`extract(month from ${transactionDateTz}) = ${data.month}`
            : sql`true`,
          data.year !== undefined
            ? sql`extract(year from ${transactionDateTz}) = ${data.year}`
            : sql`true`,
          eq(payee.user_id, data.userId),
          eq(expense.user_id, data.userId)
        )
      )
      .orderBy(desc(expense.transaction_date));
  });
