import {
  decimal,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

const timestamps = {
  created_at: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
};

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  description: text("description").notNull().unique(),
  icon_name: text("icon_name").default("CircleHelp").notNull(),
  parent_category: text("parent_category").default("Uncategorized").notNull(),
  ...timestamps,
});

export const payee = pgTable("payee", {
  id: serial("id").primaryKey(),
  payee_upi_id: text("payee_upi_id").notNull().unique(),
  name: text("name").notNull(),
  category_id: integer("category_id")
    .default(0)
    .references(() => category.id, { onDelete: "set default" }),
  user_id: text("user_id").references(() => user.id, { onDelete: "set null" }),
  ...timestamps,
});

export const expense = pgTable("expense", {
  id: serial("id").primaryKey(),
  sender_upi_id: text("sender_upi_id").notNull(),
  payee_id: integer("payee_id")
    .notNull()
    .references(() => payee.id, { onDelete: "restrict" }),
  amount: decimal("amount").notNull(), // Use decimal for numeric
  transaction_date: timestamp("transaction_date", { withTimezone: true }),
  category_id: integer("category_id")
    .default(0)
    .references(() => category.id),
  upi_ref_no: text("upi_ref_no").notNull().unique(),
  user_id: text("user_id").references(() => user.id),
  ...timestamps,
});
