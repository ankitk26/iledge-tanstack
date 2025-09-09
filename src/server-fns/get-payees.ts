import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { category, payee } from "~/db/schema";
import { getUser } from "./get-user";

export const getPayees = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("Invalid User");
  }

  return db
    .select({
      payeeId: payee.id,
      payeeName: payee.name,
      payeeUpiId: payee.payee_upi_id,
      categoryId: category.id,
      categoryDescription: category.description,
      categoryIcon: category.icon_name,
    })
    .from(payee)
    .innerJoin(category, eq(payee.category_id, category.id))
    .where(eq(payee.user_id, user.id))
    .orderBy(payee.name, payee.payee_upi_id);
});
