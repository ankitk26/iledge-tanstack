import { createServerFn } from "@tanstack/react-start";
import { and, eq, inArray, sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { expense, payee } from "~/db/schema";
import { transactionDateTz } from "~/lib/get-time-zone-dates";
import { getUser } from "./get-user";

export const getPayeeMonthlyTotals = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payees: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    const payeeIds = data.payees.split(",").map((p) => parseInt(p));

    return db
      .select({
        monthDate: sql<string>`DATE_TRUNC('month', ${transactionDateTz})`,
        amount: sql<number>`round(sum(expense.amount))::float`,
      })
      .from(expense)
      .innerJoin(payee, eq(expense.payee_id, payee.id))
      .where(
        and(
          inArray(expense.payee_id, payeeIds),
          eq(expense.user_id, user.id),
          eq(payee.user_id, user.id)
        )
      )
      .groupBy(sql`DATE_TRUNC('month', ${transactionDateTz})`)
      .orderBy(sql`DATE_TRUNC('month', ${transactionDateTz})`);
  });
