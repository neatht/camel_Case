import * as express from 'express';
import { jwtCheck } from '../../middleware/auth';
import {
    getMediaFromProject,
    getMediaFromOwnProject,
    addMediaToProject,
    updateMediaFromOwnProject,
    getProjectById,
    getOwnProject,
    addProject,
    updateProject,
    deleteProject,
    getAllProjectsByUser
} from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/own/media', jwtCheck, connectPool, addMediaToProject);
router.put('/own/media', jwtCheck, connectPool, updateMediaFromOwnProject);
router.get('/own/media/:projectID', jwtCheck, connectPool, getMediaFromOwnProject);
router.get('/media/:userID/:projectID', connectPool, getMediaFromProject);
router.get('/own/:projectID', jwtCheck, connectPool, getOwnProject);
router.get('/:userID/:projectID', connectPool, getProjectById);
router.get('/:userID', connectPool, getAllProjectsByUser);
router.post('/own', jwtCheck, connectPool, addProject);
router.put('/own', jwtCheck, connectPool, updateProject);
router.delete('/own', jwtCheck, connectPool, deleteProject);

export default router;