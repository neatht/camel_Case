import * as express from "express";
import { addExperience } from './controller';
// import { profileValidator } from './validator';
// import { checkValidation } from '../../middleware/validator';
import { jwtCheck, checkIsOwner } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/', jwtCheck, connectPool, addExperience); // Add validation

export default router;