import { createServerFn } from "@tanstack/react-start";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { transactionDateTz } from "~/lib/get-time-zone-dates";

export const getPayeeTotals = createServerFn({ method: "GET" })
  .validator(
    z.object({
      month: z.number().optional(),
      year: z.number().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { month, year } = data;

    return db
      .select({
        id: payee.id,
        name: payee.name,
        upi_id: payee.payee_upi_id,
        amount: sql<number>`sum(${expense.amount})::float`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(
        and(
          eq(
            sql`extract(month from ${transactionDateTz})`,
            month ?? sql`extract(month from ${transactionDateTz})::int`
          ),
          eq(
            sql`extract(year from ${transactionDateTz})`,
            year ?? sql`extract(year from ${transactionDateTz})::int`
          )
        )
      )
      .groupBy(payee.id, payee.name, payee.payee_upi_id)
      .orderBy(payee.name);
  });
