import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { payee } from "~/db/schema";

export const getPayeeById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payeeId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    return db
      .select({
        name: payee.name,
        payee_upi_id: payee.payee_upi_id,
      })
      .from(payee)
      .where(eq(payee.id, parseInt(data.payeeId)));
  });
