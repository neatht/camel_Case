import * as express from 'express';
import { signS3 } from './controller';
import { jwtCheck } from '../../middleware/auth';

const router = express.Router();

router.post('/', jwtCheck, signS3);

export default router;