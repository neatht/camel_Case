import * as express from "express";
import { addUser } from './controller';

const router = express.Router();

router.post('/', addUser);

export default router;