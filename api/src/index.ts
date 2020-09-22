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

import { jwtCheck } from './middleware/auth';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;
 
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname+'../../../client/build/index.html'));
});

app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`Server started at localhost:${port}`);
});