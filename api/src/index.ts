import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT || 5000;

// Serve static react build
app.use(express.static(path.join(__dirname, 'client/build')));

// Test
app.get('/api/getList', (req, res) => {
	const list = ['item1', 'item2'];
	res.json(list);
})

// Route to React app by default
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname+'client/build/index.html'));
});

// Start the Express sever
app.listen(port, () => {
	// tslint:disable-next-line:no-console
	console.log(`Server started at localhost:${port}`);
});