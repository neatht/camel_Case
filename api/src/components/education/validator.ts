/**
 * This file contains middleware that validate the data for endpoints in the
 * education component.
 */

import { body } from 'express-validator';

export const addEducationValidator = [
  body('data.institution').exists().isString().isLength({ min: 1, max: 100 }),
  body('data.qualification').optional().isString().isLength({ max: 100 }),
  body('data.description').optional().isString().isLength({ max: 400 }),
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.startDate').exists().isDate(),
  body('data.endDate').optional().isDate(),
];

export const updateEducationValidator = [
  body('data.institution').optional().isString().isLength({ min: 1, max: 100 }),
  body('data.qualification').optional().isString().isLength({ max: 100 }),
  body('data.description').optional().isString().isLength({ max: 400 }),
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.startDate').optional().isDate(),
  body('data.endDate').optional().isDate(),
  body('data.educationID').exists().isString()
];
