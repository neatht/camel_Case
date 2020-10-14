import * as express from "express";
import { addExperience, getExperiences } from './controller';
// import { profileValidator } from './validator';
// import { checkValidation } from '../../middleware/validator';
import { jwtCheck, checkIsOwner } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/:userID', connectPool, getExperiences);
router.post('/', jwtCheck, connectPool, addExperience); // Add validation

export default router;