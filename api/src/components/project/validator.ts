import { body } from 'express-validator';
import { isStrArr } from '../../middleware/validator';

export const mediaValidator = [
  body('data.fileName').exists().isString().isLength({ max: 20 }),
  body('data.projectId').exists().isNumeric(),
]