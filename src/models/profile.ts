import { date, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { Users } from "./user.ts";



export const Profiles = pgTable('profile',{
    id : serial('id').primaryKey(),
    user_id : integer('user_id').notNull().references(()=> Users.id, { onDelete:'cascade'}),
    full_name: varchar('full_name',{length:100}).notNull(),
    user_type : varchar('user_type',{length:20}).notNull(),
    address : text('address'),
    dob : date('dob'),
    gender: varchar('gender',{length:20}),
    school: varchar('school',{length:50}),
    grade: varchar ('grade',{length:30}),
 }
)