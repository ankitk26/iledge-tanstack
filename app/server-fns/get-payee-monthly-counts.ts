import { createServerFn } from "@tanstack/react-start";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { transactionDateTz } from "~/lib/get-time-zone-dates";

export const getPayeeMonthlyCounts = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payeeId: z.number(),
    })
  )
  .handler(async ({ data }) => {
    return db
      .select({
        monthDate: sql<string>`DATE_TRUNC('month', ${transactionDateTz})`,
        count: sql<number>`count(*)::int`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(eq(expense.payee_id, data.payeeId))
      .groupBy(sql`DATE_TRUNC('month', ${transactionDateTz})`)
      .orderBy(sql`DATE_TRUNC('month', ${transactionDateTz})`);
  });
