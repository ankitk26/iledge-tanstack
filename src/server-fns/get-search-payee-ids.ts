import { createServerFn } from "@tanstack/react-start";
import { and, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { payee } from "@/db/schema";

import { getUser } from "./get-user";

export const getSearchPayeeIds = createServerFn({ method: "GET" })
	.inputValidator(
		z.object({
			query: z.string(),
		}),
	)
	.handler(async ({ data }) => {
		const user = await getUser();
		if (!user) {
			throw new Error("Invalid User");
		}

		const payees = await db
			.select({
				id: payee.id,
			})
			.from(payee)
			.where(
				and(
					or(
						ilike(payee.name, `%${data.query}%`),
						ilike(payee.payee_upi_id, `%${data.query}%`),
					),
					eq(payee.user_id, user.id),
				),
			);

		return payees.map((payee) => payee.id.toString()).join(",");
	});
