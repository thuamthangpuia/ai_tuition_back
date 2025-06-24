import { Pool } from 'pg';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
    user  : process.env.DB_USER ,
    host : process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,

})


export const db = drizzle(pool)
