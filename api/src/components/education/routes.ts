import * as express from "express";
import { getOwnEducation, getEducation, addEducation, updateEducation, deleteEducation } from './controller';
// import { experienceValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/GetOwnEducation', jwtCheck, connectPool, getOwnEducation);
router.get('/:userID', connectPool, getEducation);
router.post('/', jwtCheck, connectPool, addEducation);
router.put('/', jwtCheck, connectPool, updateEducation);
router.delete('/', jwtCheck, connectPool, deleteEducation);

export default router;