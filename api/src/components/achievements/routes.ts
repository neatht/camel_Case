import * as express from "express";
import { getAchievements, addAchievement, deleteAchievement, getOwnAchievements } from './controller';
import { achievementValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/', jwtCheck, connectPool, getOwnAchievements)
router.get('/:userID', connectPool, getAchievements);
router.post('/', jwtCheck, achievementValidator, checkValidation, connectPool, addAchievement);
router.delete('/', jwtCheck, achievementValidator, checkValidation, connectPool, deleteAchievement);

export default router;