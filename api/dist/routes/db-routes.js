"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postgres_1 = __importDefault(require("../config/postgres"));
const user_1 = require("../queries/user");
const router = express_1.default.Router();
router.get('/getUser/:userId', (req, res) => {
    postgres_1.default
        .query(user_1.getUserById, [req.params.userId])
        .then(result => {
        res.json(result.rows);
    })
        .catch(err => {
        throw err;
    });
});
exports.default = router;
//# sourceMappingURL=db-routes.js.map