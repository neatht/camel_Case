import express from "express";
import client from "../config/postgres";
import { getUserById, addUser } from "../queries/user";

const router = express.Router();

router.get('/getUser/:userId', (req, res) => {
    client
        .query(getUserById, [req.params.userId])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            throw err;
        });
});

router.post('/addUser', (req, res) => {
    client
        .query(addUser, [req.body.row])
        .then(result => {
            res.json(result.rows[0]);
        })
        .catch(err => {
            throw err;
        });
});

export default router;