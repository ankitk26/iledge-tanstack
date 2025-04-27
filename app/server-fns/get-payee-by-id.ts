import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { payee } from "~/db/schema";
import { getUser } from "./get-user";

export const getPayeeById = createServerFn({ method: "GET" })
  .validator(
    z.object({
      payeeId: z.string(),
    })
  )
  .handler(async ({ data }) => {
    const user = await getUser();
    if (!user) {
      throw new Error("Invalid User");
    }

    return db
      .select({
        name: payee.name,
        payee_upi_id: payee.payee_upi_id,
      })
      .from(payee)
      .where(
        and(eq(payee.id, parseInt(data.payeeId)), eq(payee.user_id, user.id))
      );
  });
