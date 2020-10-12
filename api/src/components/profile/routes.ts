import * as express from "express";
import { getUser, addUser, updateUser, deleteUser, getUserID } from './controller';
import { profileValidator } from './validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/getID', jwtCheck, connectPool, getUserID);
router.get('/:id', connectPool, getUser);
router.post('/', jwtCheck, profileValidator, connectPool, addUser);
router.put('/', jwtCheck, profileValidator, connectPool, updateUser);
router.delete('/', jwtCheck, connectPool, deleteUser);

export default router;