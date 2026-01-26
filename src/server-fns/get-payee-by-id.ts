import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { category, payee } from "~/db/schema";
import { getUser } from "./get-user";

export const getPayeeById = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      payeeId: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    return db
      .select({
        id: payee.id,
        name: payee.name,
        payee_upi_id: payee.payee_upi_id,
        category_id: category.id,
        category_name: category.description,
      })
      .from(payee)
      .innerJoin(category, eq(payee.category_id, category.id))
      .where(
        and(eq(payee.id, parseInt(data.payeeId)), eq(payee.user_id, user.id)),
      )
      .limit(1);
  });
