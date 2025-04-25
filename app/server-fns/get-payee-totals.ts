import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";

export const getPayeeTotals = createServerFn({ method: "GET" }).handler(
  async () => {
    return db
      .select({
        id: payee.id,
        name: payee.name,
        upi_id: payee.payee_upi_id,
        amount: sql<number>`sum(${expense.amount})::float`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .groupBy(payee.id, payee.name, payee.payee_upi_id)
      .orderBy(payee.name);
  }
);
