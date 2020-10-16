import * as express from 'express';
import { jwtCheck } from '../../middleware/auth';
import { getMediaFromProject, getMediaFromOwnProject, addMediaToProject } from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/media', jwtCheck, connectPool, addMediaToProject);
router.get('/media', jwtCheck, connectPool, getMediaFromProject);
router.get('/media', jwtCheck, connectPool, getMediaFromOwnProject);

export default router;