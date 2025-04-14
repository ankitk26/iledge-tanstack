import {
  pgTable,
  unique,
  pgPolicy,
  serial,
  text,
  timestamp,
  foreignKey,
  integer,
  boolean,
  numeric,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const categories = pgTable(
  "categories",
  {
    id: serial().primaryKey().notNull(),
    description: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    iconName: text("icon_name").default("circle-help").notNull(),
    parentCategory: text("parent_category").default("Uncategorized").notNull(),
  },
  (table) => [
    unique("categories_description_unique").on(table.description),
    pgPolicy("categories access", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
    }),
  ]
);

export const receivers = pgTable(
  "receivers",
  {
    id: serial().primaryKey().notNull(),
    receiverUpiId: text("receiver_upi_id").notNull(),
    name: text().notNull(),
    categoryId: integer("category_id").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "receivers_category_id_categories_id_fk",
    }).onDelete("set default"),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "receivers_user_id_user_id_fk",
    }),
    unique("receivers_receiver_upi_id_unique").on(table.receiverUpiId),
    pgPolicy("receivers access", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
    }),
  ]
);

export const user = pgTable(
  "user",
  {
    id: text().primaryKey().notNull(),
    name: text().notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").notNull(),
    image: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    role: text().default("user").notNull(),
  },
  (table) => [
    unique("user_email_unique").on(table.email),
    pgPolicy("restrict access", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
    }),
  ]
);

export const session = pgTable(
  "session",
  {
    id: text().primaryKey().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    token: text().notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "session_user_id_user_id_fk",
    }).onDelete("cascade"),
    unique("session_token_unique").on(table.token),
    pgPolicy("restrict access", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
    }),
  ]
);

export const account = pgTable(
  "account",
  {
    id: text().primaryKey().notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull(),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "string",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "string",
    }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "account_user_id_user_id_fk",
    }).onDelete("cascade"),
    pgPolicy("account access", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
      withCheck: sql`false`,
    }),
  ]
);

export const verification = pgTable(
  "verification",
  {
    id: text().primaryKey().notNull(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }),
    updatedAt: timestamp("updated_at", { mode: "string" }),
  },
  (table) => [
    pgPolicy("restrict access", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
    }),
  ]
);

export const transactions = pgTable(
  "transactions",
  {
    id: serial().primaryKey().notNull(),
    senderUpiId: text("sender_upi_id").notNull(),
    receiverId: integer("receiver_id").notNull(),
    amount: numeric().notNull(),
    transactionDate: timestamp("transaction_date", { mode: "string" }),
    categoryId: integer("category_id").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    upiRefNo: text("upi_ref_no").notNull(),
    userId: text("user_id").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categories.id],
      name: "transactions_category_id_categories_id_fk",
    }).onDelete("set default"),
    foreignKey({
      columns: [table.receiverId],
      foreignColumns: [receivers.id],
      name: "transactions_receiver_id_receivers_id_fk",
    }),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [user.id],
      name: "transactions_user_id_user_id_fk",
    }),
    unique("transactions_upi_ref_no_unique").on(table.upiRefNo),
    pgPolicy("transactions policies", {
      as: "permissive",
      for: "all",
      to: ["public"],
      using: sql`false`,
    }),
  ]
);
