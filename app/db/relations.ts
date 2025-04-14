import { relations } from "drizzle-orm/relations";
import {
  categories,
  receivers,
  user,
  session,
  account,
  transactions,
} from "./schema";

export const receiversRelations = relations(receivers, ({ one, many }) => ({
  category: one(categories, {
    fields: [receivers.categoryId],
    references: [categories.id],
  }),
  user: one(user, {
    fields: [receivers.userId],
    references: [user.id],
  }),
  transactions: many(transactions),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  receivers: many(receivers),
  transactions: many(transactions),
}));

export const userRelations = relations(user, ({ many }) => ({
  receivers: many(receivers),
  sessions: many(session),
  accounts: many(account),
  transactions: many(transactions),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
  receiver: one(receivers, {
    fields: [transactions.receiverId],
    references: [receivers.id],
  }),
  user: one(user, {
    fields: [transactions.userId],
    references: [user.id],
  }),
}));
