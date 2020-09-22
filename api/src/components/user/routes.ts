import * as express from "express";
import { addUser } from './controller';

const router = express.Router();

router.post('/add', addUser);