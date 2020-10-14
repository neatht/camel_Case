import * as express from "express";
import { addExperience, updateExperience, getExperiences, deleteExperience, getOwnExperiences } from './controller';
import { addExperienceValidator, updateExperienceValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/GetOwnExperiences', jwtCheck, connectPool, getOwnExperiences);
router.get('/:userID', connectPool, getExperiences);
router.post('/', jwtCheck, addExperienceValidator, checkValidation, connectPool, addExperience); 
router.put('/', jwtCheck, updateExperienceValidator, checkValidation, connectPool, updateExperience); 
router.delete('/', jwtCheck, connectPool, deleteExperience);

export default router;