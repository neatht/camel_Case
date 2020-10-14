import * as express from "express";
import { addExperience, updateExperience, getExperiences, deleteExperience, getOwnExperiences } from './controller';
import { experienceValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck, checkIsOwner } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/GetOwnExperiences', jwtCheck, checkIsOwner, connectPool, getOwnExperiences);
router.get('/:userID', connectPool, getExperiences);
router.post('/', jwtCheck, experienceValidator, checkValidation, connectPool, addExperience); // Add validation
router.put('/', jwtCheck, experienceValidator, checkValidation, connectPool, updateExperience); // Add validation
router.delete('/', jwtCheck, connectPool, deleteExperience);

export default router;