/**
 * This file contains middleware that validate the data for endpoints in the
 * profile component.
 */

import { body } from 'express-validator';
import { isEnum } from '../../middleware/validator';

export const addProfileValidator = [
  body('data.firstName').exists().isString().isLength({ min: 1, max: 50 }),
  body('data.lastName').exists().isString().isLength({ min: 1, max: 50 }),
  body('data.bio').optional().isString().isLength({ max: 1000 }),
  body('data.DOB').optional().isDate(),
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.lookingForWork').exists().isBoolean(),
  body('data.public').exists().isBoolean(),
  body('data.gender').exists().custom((val) => {
    return isEnum(['male', 'female', 'other'], val);
  }),
  body('data.publicLocation').optional().isBoolean()
];

export const updateProfileValidator = [
  body('data.firstName').optional().isString().isLength({ min: 1, max: 50 }),
  body('data.lastName').optional().isString().isLength({ min: 1, max: 50 }),
  body('data.bio').optional().isString().isLength({ max: 1000 }),
  body('data.DOB').optional().isDate(),
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.lookingForWork').optional().isBoolean(),
  body('data.public').optional().isBoolean(),
  body('data.gender').optional().custom((val) => {
    return isEnum(['male', 'female', 'other'], val);
  }),
  body('data.publicLocation').optional().isBoolean()
];