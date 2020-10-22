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

router.post('/own/media', jwtCheck, connectPool, addMediaToProject);
router.put('/own/media', jwtCheck, connectPool, updateMediaFromOwnProject);
router.get('/own/media/:projectID', jwtCheck, connectPool, getMediaFromOwnProject);
router.get('/media/:userID/:projectID', connectPool, getMediaFromProject);
router.get('/own/:projectID', jwtCheck, connectPool, getOwnProject);
router.get('/:userID/:projectID', connectPool, getProject);
router.post('/own', jwtCheck, connectPool, addProject);
router.put('/own', jwtCheck, connectPool, updateProject);

export default router;