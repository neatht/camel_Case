import * as express from "express";
import { addUser, getUser } from './controller';
import { profileValidator } from './validator';

const router = express.Router();

router.post('/', addUser);
router.get('/:id', getUser);


export default router;