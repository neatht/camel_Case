/**
 * This file is responsible for starting the Express server and adding routes
 * and middleware to the application. Libraries, routes and middleware are
 * first imported and then the routes and middleware are added. Finally, the
 * server is started on a port specified in the .env file, or 5000 by default.
 */

import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import https from 'https';
import http from 'http';
import fs from 'fs';

import { jwtCheck } from './middleware/auth';
import dbRoutes from "./routes/db-routes";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;
 
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

app.use('/db', dbRoutes);

// Test
app.get('/api/getList', (req, res) => {
	const list = ['item1', 'item2'];
	res.json(list);
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'../../../client/build/index.html'));
});

https.createServer({
	key: fs.readFileSync(process.env.SSL_KEY_FILE),
	cert: fs.readFileSync(process.env.SSL_CRT_FILE)
}, app).listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`Server started at localhost:${port}`);
});

const httpApp = express();

httpApp.get("*", (req, res) => {
	res.redirect('https://' + req.hostname + req.url);
});

http.createServer(httpApp).listen(80, () => {
	console.log(`redirect Server started at localhost:80`)
})