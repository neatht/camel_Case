import * as express from 'express';
import { jwtCheck } from '../../middleware/auth';
import {
    getDisplayPhoto,
    getHeroImage,
    deleteDisplayPhoto,
    deleteHeroImage,
    addDisplayPhoto,
    addHeroImage
} from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/displayPhoto', jwtCheck, connectPool, addDisplayPhoto);
router.get('/displayPhoto', jwtCheck, connectPool, getDisplayPhoto);
router.delete('/displayPhoto', jwtCheck, connectPool, deleteDisplayPhoto);
router.post('/heroImage', jwtCheck, connectPool, addHeroImage);
router.get('/heroImage', jwtCheck, connectPool, getHeroImage);
router.delete('/heroImage', jwtCheck, connectPool, deleteHeroImage);

export default router;