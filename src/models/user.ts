import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users',{
    id : serial('id').primaryKey(),
    username: varchar('user_name',{length:255}).unique().notNull(),
    password : varchar('password',{length:255}).notNull(),
    email : varchar('email',{length:255}).notNull().unique(),
    phone:varchar('phone',{length:15}).notNull().unique(),
    created_at: timestamp('created_at').defaultNow().notNull(),
})