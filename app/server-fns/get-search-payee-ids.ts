import { createServerFn } from "@tanstack/react-start";
import { ilike, or } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { payee } from "~/db/schema";

export const getSearchPayeeIds = createServerFn({ method: "GET" })
  .validator(
    z.object({
      query: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const payees = await db
      .select({
        id: payee.id,
      })
      .from(payee)
      .where(
        or(
          ilike(payee.name, `%${data.query}%`),
          ilike(payee.payee_upi_id, `%${data.query}%`)
        )
      );

    return payees.map((payee) => payee.id.toString()).join(",");
  });
