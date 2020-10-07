/**
 * This file is responsible for starting the Express server. Registering routes
 * and middleware is delegated to a routes file.
 */

import dotenv from 'dotenv';
import express from 'express';
import https from 'https';
import http from 'http';
import fs from 'fs';
import { register } from './routes';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

https.createServer({
	key: fs.readFileSync(process.env.SSL_KEY_FILE),
	cert: fs.readFileSync(process.env.SSL_CRT_FILE)
}, app).listen(port, () => {
	console.log(`Server started at localhost:${port}`);
});

register(app);

const httpApp = express();

httpApp.get("*", (req, res) => {
	res.redirect('https://' + req.hostname + req.originalUrl);
});

http.createServer(httpApp).listen(80, '0.0.0.0', () => {
	console.log(`redirect Server started at localhost:80`);
})
