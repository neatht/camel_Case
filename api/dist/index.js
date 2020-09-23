"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_routes_1 = __importDefault(require("./routes/db-routes"));
dotenv_1.default.config();
const app = express_1.default();
const port = process.env.SERVER_PORT || 5000;
// Serve static react build
app.use(express_1.default.static(path_1.default.join(__dirname, 'client/build')));
app.use('/db', db_routes_1.default);
// Test
app.get('/api/getList', (req, res) => {
    const list = ['item1', 'item2'];
    res.json(list);
});
// Route to React app by default
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname + 'client/build/index.html'));
});
// Start the Express sever
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at localhost:${port}`);
});
//# sourceMappingURL=index.js.map