import * as express from "express";
import { addUser } from './controller';
import { profileValidator } from './validator';

const router = express.Router();

router.post('/', profileValidator, addUser);

export default router;