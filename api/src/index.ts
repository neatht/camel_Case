// Import modules
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// Import routes and middleware
import { authenticateAccessToken } from './middleware/auth';
import { router as authRouter } from './components/auth/routes';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

// Serve static react build
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());

// Test
app.get('/api/getList', authenticateAccessToken, (req, res) => {
	const list = ['item1', 'item2'];
	res.json(list);
})

// Auth component
app.use('/auth', authRouter);

// Route to React app by default
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname+'../../../client/build/index.html'));
});

// Start the Express sever
app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`Server started at localhost:${port}`);
});