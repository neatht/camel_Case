import * as express from "express";
import { getOwnEducation, getEducation } from './controller';
// import { experienceValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/GetOwnEducation', jwtCheck, connectPool, getOwnEducation);
router.get('/:userID', connectPool, getEducation);

export default router;