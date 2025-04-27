import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { payee } from "~/db/schema";

export const updatePayeeCategory = createServerFn({ method: "POST" })
  .validator(
    z.object({
      payeeId: z.number(),
      updatedCategoryId: z.number(),
    })
  )
  .handler(async ({ data }) => {
    await db
      .update(payee)
      .set({
        category_id: data.updatedCategoryId,
      })
      .where(eq(payee.id, data.payeeId));
  });
