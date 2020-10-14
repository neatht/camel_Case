import * as express from "express";
import { getOwnEducation } from './controller';
// import { experienceValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck, checkIsOwner } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/GetOwnEducation', jwtCheck, checkIsOwner, connectPool, getOwnEducation);

export default router;