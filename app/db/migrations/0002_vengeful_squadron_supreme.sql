ALTER TABLE "expense" RENAME COLUMN "receiver_id" TO "payee_id";--> statement-breakpoint
ALTER TABLE "payee" RENAME COLUMN "receiver_upi_id" TO "payee_upi_id";--> statement-breakpoint
ALTER TABLE "payee" DROP CONSTRAINT "payee_receiver_upi_id_unique";--> statement-breakpoint
ALTER TABLE "payee" ADD CONSTRAINT "payee_payee_upi_id_unique" UNIQUE("payee_upi_id");