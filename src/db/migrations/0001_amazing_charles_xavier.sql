ALTER TABLE "category" RENAME COLUMN "iconName" TO "icon_name";--> statement-breakpoint
ALTER TABLE "category" RENAME COLUMN "parentCategory" TO "parent_category";--> statement-breakpoint
ALTER TABLE "category" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "category" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "senderUpiId" TO "sender_upi_id";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "receiverId" TO "receiver_id";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "transactionDate" TO "transaction_date";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "upiRefNo" TO "upi_ref_no";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "expense" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "payee" RENAME COLUMN "receiverUpiId" TO "receiver_upi_id";--> statement-breakpoint
ALTER TABLE "payee" RENAME COLUMN "categoryId" TO "category_id";--> statement-breakpoint
ALTER TABLE "payee" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "payee" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "payee" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "expense" DROP CONSTRAINT "expense_upiRefNo_unique";--> statement-breakpoint
ALTER TABLE "payee" DROP CONSTRAINT "payee_receiverUpiId_unique";--> statement-breakpoint
ALTER TABLE "payee" DROP CONSTRAINT "payee_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "payee" DROP CONSTRAINT "payee_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "accessTokenExpiresAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "refreshTokenExpiresAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "account" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "expiresAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "session" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "createdAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "createdAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "createdAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updatedAt" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "verification" ALTER COLUMN "updatedAt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payee" ADD CONSTRAINT "payee_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE set default ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payee" ADD CONSTRAINT "payee_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "expense" ADD CONSTRAINT "expense_upi_ref_no_unique" UNIQUE("upi_ref_no");--> statement-breakpoint
ALTER TABLE "payee" ADD CONSTRAINT "payee_receiver_upi_id_unique" UNIQUE("receiver_upi_id");