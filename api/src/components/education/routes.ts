import * as express from "express";
import { getOwnEducation, getEducation, addEducation, updateEducation, deleteEducation } from './controller';
import { addEducationValidator, updateEducationValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/getOwnEducation', jwtCheck, connectPool, getOwnEducation);
router.get('/:userID', connectPool, getEducation);
router.post('/', jwtCheck, addEducationValidator, checkValidation, connectPool, addEducation);
router.put('/', jwtCheck, updateEducationValidator, checkValidation, connectPool, updateEducation);
router.delete('/', jwtCheck, connectPool, deleteEducation);

export default router;