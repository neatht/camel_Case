import * as express from 'express';
import { jwtCheck } from '../../middleware/auth';
import {
    getMediaFromProject,
    getMediaFromOwnProject,
    addMediaToProject,
    updateMediaFromOwnProject,
    getProjectById,
    getOwnProjectById,
    addProject,
    updateProject,
    deleteProject,
    getAllProjectsByUser,
    getAllOwnProjects
} from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/media', jwtCheck, connectPool, addMediaToProject);
router.put('/media', jwtCheck, connectPool, updateMediaFromOwnProject);
router.get('/media/getOwnMedia/:projectID', jwtCheck, connectPool, getMediaFromOwnProject);
router.get('/media/:userID/:projectID', connectPool, getMediaFromProject);
router.get('/getOwnProject/:projectID', jwtCheck, connectPool, getOwnProjectById);
router.get('/:userID/:projectID', connectPool, getProjectById);
router.get('/getOwnProjects', jwtCheck, connectPool, getAllOwnProjects);
router.get('/:userID', connectPool, getAllProjectsByUser);
router.post('/', jwtCheck, connectPool, addProject);
router.put('/', jwtCheck, connectPool, updateProject);
router.delete('/', jwtCheck, connectPool, deleteProject);

export default router;