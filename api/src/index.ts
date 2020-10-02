/**
 * This file is responsible for starting the Express server. Registering routes
 * and middleware is delegated to a routes file.
 */

import dotenv from 'dotenv';
import express from 'express';
import { register } from './routes';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

register(app);

app.listen(port, () => {
	console.log(`Server started at localhost:${port}`);
});