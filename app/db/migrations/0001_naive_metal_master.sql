ALTER TABLE "transactions" RENAME TO "expenses";--> statement-breakpoint
ALTER TABLE "receivers" RENAME TO "payees";--> statement-breakpoint
ALTER TABLE "payees" DROP CONSTRAINT "receivers_receiver_upi_id_unique";--> statement-breakpoint
ALTER TABLE "expenses" DROP CONSTRAINT "transactions_upi_ref_no_unique";--> statement-breakpoint
ALTER TABLE "payees" DROP CONSTRAINT "receivers_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "payees" DROP CONSTRAINT "receivers_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" DROP CONSTRAINT "transactions_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" DROP CONSTRAINT "transactions_receiver_id_receivers_id_fk";
--> statement-breakpoint
ALTER TABLE "expenses" DROP CONSTRAINT "transactions_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "payees" ADD CONSTRAINT "payees_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payees" ADD CONSTRAINT "payees_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_receiver_id_payees_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."payees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payees" ADD CONSTRAINT "payees_receiver_upi_id_unique" UNIQUE("receiver_upi_id");--> statement-breakpoint
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_upi_ref_no_unique" UNIQUE("upi_ref_no");--> statement-breakpoint
ALTER POLICY "receivers access" ON "payees" RENAME TO "payees access";--> statement-breakpoint
ALTER POLICY "transactions policies" ON "expenses" RENAME TO "expenses policies";