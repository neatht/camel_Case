import * as express from 'express';
import { jwtCheck } from '../../middleware/auth';
import {
    getMediaFromProject,
    getMediaFromOwnProject,
    addMediaToProject,
    updateMediaFromOwnProject,
    getProject,
    getOwnProject,
    addProject,
    updateProject
} from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/own/project/media', jwtCheck, connectPool, addMediaToProject);
router.put('/own/project/media', jwtCheck, connectPool, updateMediaFromOwnProject);
router.get('/own/project/media', jwtCheck, connectPool, getMediaFromOwnProject);
router.get('/project/media', connectPool, getMediaFromProject);
router.get('/project', connectPool, getProject);
router.put('/own/project', jwtCheck, connectPool, getOwnProject);
router.post('/own/project', jwtCheck, connectPool, addProject);
router.put('/own/project', jwtCheck, connectPool, updateProject);

export default router;