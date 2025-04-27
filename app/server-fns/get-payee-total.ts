import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";

export const getPayeeOverallSummary = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payeeId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    return db
      .select({
        total_amount: sql<number>`SUM(expense.amount)::float`,
        average_amount: sql<number>`AVG(expense.amount)::float`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(eq(expense.payee_id, parseInt(data.payeeId)));
  });
