"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 5000;
// Route to default home page
app.get("/", (req, res) => {
    res.send("Hello");
});
// Start the Express sever
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server started at localhost:${port}`);
});
//# sourceMappingURL=index.js.map