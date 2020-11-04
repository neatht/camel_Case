import * as express from "express";
import { searchProject, searchUser, search } from './controller';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';
const router = express.Router();

router.get('/project/:query', connectPool, searchProject);
router.get('/user/:query', connectPool, searchUser);
router.get('/:query', connectPool, search);

export default router;