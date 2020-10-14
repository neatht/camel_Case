import * as express from "express";
import { getOwnEducation, getEducation, addEducation } from './controller';
// import { experienceValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/GetOwnEducation', jwtCheck, connectPool, getOwnEducation);
router.get('/:userID', connectPool, getEducation);
router.post("/", jwtCheck, connectPool, addEducation);

export default router;