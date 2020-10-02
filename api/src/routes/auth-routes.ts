
import express from 'express';
import { jwtCheck } from '../middleware/jwt';

const router = express.Router();

// api to check if routes that require route is working
router.get('/check', jwtCheck, (req, res) => {
	res.sendStatus(400);
});

export default router;