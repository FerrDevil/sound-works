import { boolean, date, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { randomUUID } from 'crypto'
/* import { relations } from "drizzle-orm"; */


export const usersTable = mysqlTable("users", {
  id: varchar({ length: 128 }).primaryKey().$default(() => randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({length: 255}).notNull(),
  emailConfirmed: boolean().default(false).notNull(),
  createdAt: date({mode: "date"}).notNull().$default(() => new Date(Date.now()) ),
  updatedAt: date({mode: "date"}).notNull().$default(() => new Date(Date.now()) ),
  image: varchar({length: 255}),
  role: mysqlEnum("roles", ["user", "admin"]).default("user").notNull()
});

export const tracksTable = mysqlTable("tracks", {
  id: varchar({ length: 128 }).primaryKey().$default(() => randomUUID()),
  title: varchar({ length: 255 }).notNull(),
  authorId: varchar({ length: 128 }).references(() => usersTable.id),
  createdAt: date({mode: "date"}).notNull().$default(() => new Date(Date.now()) ),
  image: varchar({length: 255}),
  track: varchar({length: 255}),
  
});

/* export const tracksRelations = relations(tracksTable, ({ one }) => ({
	usersTable: one(usersTable),
}));

export const usersRelations = relations(usersTable, ({ many }) => ({
	tracksTable: many(tracksTable),
})); */