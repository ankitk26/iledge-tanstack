import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { payee } from "~/db/schema";
import { getUser } from "./get-user";

export const updatePayeeCategory = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      payeeId: z.number(),
      updatedCategoryId: z.number(),
    }),
  )
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    const checkPayee = await db
      .select()
      .from(payee)
      .where(and(eq(payee.id, data.payeeId), eq(payee.user_id, user.id)))
      .limit(1);
    if (checkPayee.length === 0) {
      throw new Error("Unauthorized Request");
    }

    await db
      .update(payee)
      .set({
        category_id: data.updatedCategoryId,
      })
      .where(eq(payee.id, data.payeeId));
  });
