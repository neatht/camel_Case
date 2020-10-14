import * as express from "express";
import { addExperience, updateExperience, getExperiences, deleteExperience } from './controller';
// import { profileValidator } from './validator';
// import { checkValidation } from '../../middleware/validator';
import { jwtCheck, checkIsOwner } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/:userID', connectPool, getExperiences);
router.post('/', jwtCheck, connectPool, addExperience); // Add validation
router.put('/', jwtCheck, connectPool, updateExperience); // Add validation
router.delete('/', jwtCheck, connectPool, deleteExperience);

export default router;