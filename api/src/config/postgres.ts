/**
 * This file is responsible for connecting to the postgres database based on
 * credentials in the environment variables.
 */

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_ENDPOINT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB_NAME
});

pool.on('error', (err, client) => {
  console.error('Error:', err);
});