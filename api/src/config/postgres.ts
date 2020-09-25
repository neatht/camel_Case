/* Connect to postgres database and return client object */
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
    database: process.env.DB_NAME
});

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
});

export default client;