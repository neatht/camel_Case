import * as express from "express";
import { getUser, addUser } from './controller';
import { profileValidator } from './validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/', jwtCheck, profileValidator, addUser);
router.get('/:id', connectPool, getUser);


export default router;