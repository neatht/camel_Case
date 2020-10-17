import * as express from "express";
import { getSkills, addSkill, deleteSkill, getOwnSkills } from './controller';
import { skillValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/', jwtCheck, connectPool, getOwnSkills)
router.get('/:userID', connectPool, getSkills);
router.post('/', jwtCheck, skillValidator, checkValidation, connectPool, addSkill);
router.delete('/', jwtCheck, skillValidator, checkValidation, connectPool, deleteSkill);

export default router;