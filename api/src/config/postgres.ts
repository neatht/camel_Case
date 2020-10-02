/**
 * This file is responsible for connecting to the postgres database based on
 * credentials in the environment variables.
 */

// import { Client } from "pg";
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








// /**
//  * connectDB() connects to the postgres database.
//  */
// export const connectDB = () => {
//   const client = new Client({
//     host: process.env.DB_ENDPOINT,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     port: 5432,
//     database: process.env.DB_NAME
//   });
//   client.connect(err => {
//     if (err) {
//       console.error('connection error', err.stack);
//     } else {
//       console.log('connected');
//     }
//   });
// }