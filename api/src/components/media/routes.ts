import * as express from 'express';
import { jwtCheck } from '../../middleware/auth';
import {
    getOwnDisplayPhoto,
    getDisplayPhotoById,
    getOwnHeroImage,
    getHeroImageById,
    deleteDisplayPhoto,
    deleteHeroImage,
    addDisplayPhoto,
    addHeroImage
} from './controller';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.post('/displayPhoto', jwtCheck, connectPool, addDisplayPhoto);
router.get('/displayPhoto', jwtCheck, connectPool, getOwnDisplayPhoto);
router.get('/displayPhoto/:userID', connectPool, getDisplayPhotoById);
router.delete('/displayPhoto', jwtCheck, connectPool, deleteDisplayPhoto);
router.post('/heroImage', jwtCheck, connectPool, addHeroImage);
router.get('/heroImage', jwtCheck, connectPool, getOwnHeroImage);
router.get('/heroImage/:userID', connectPool, getHeroImageById);
router.delete('/heroImage', jwtCheck, connectPool, deleteHeroImage);

export default router;