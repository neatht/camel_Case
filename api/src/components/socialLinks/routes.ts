import * as express from "express";
import { getLinks, addLink, deleteLink, getOwnLinks } from './controller';
import { linkValidator } from './validator';
import { checkValidation } from '../../middleware/validator';
import { jwtCheck } from '../../middleware/auth';
import { connectPool } from '../../middleware/db';

const router = express.Router();

router.get('/', jwtCheck, connectPool, getOwnLinks)
router.get('/:userID', connectPool, getLinks);
router.post('/', jwtCheck, linkValidator, checkValidation, connectPool, addLink);
router.delete('/', jwtCheck, linkValidator, checkValidation, connectPool, deleteLink);

export default router;