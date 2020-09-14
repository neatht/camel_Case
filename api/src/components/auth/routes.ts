import { Router } from 'express';
const router = Router();

import { authLogin } from './controller';

router.post('/login', authLogin);

export { router };
