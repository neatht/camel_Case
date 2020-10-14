import * as express from 'express';
import { jwtCheck, checkIsOwner } from '../../middleware/auth';
import { getMediaFromProject, addMediaToProject } from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/', jwtCheck, checkIsOwner, connectPool, addMediaToProject);
router.post('/', jwtCheck, connectPool, getMediaFromProject);

export default router;