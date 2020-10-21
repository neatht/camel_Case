import * as express from "express";
import { getUser, addUser, updateUser, deleteUser, getOwnUser } from './controller';
import { profileValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/getOwnProfile', jwtCheck, connectPool, getOwnUser);
router.get('/:userID', connectPool, getUser);
router.post('/', jwtCheck, profileValidator, checkValidation, connectPool, addUser);
router.put('/', jwtCheck, profileValidator, checkValidation, connectPool, updateUser);
router.delete('/', jwtCheck, connectPool, deleteUser);

export default router;