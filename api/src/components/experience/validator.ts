/**
 * This file contains middleware that validate the data for endpoints in the
 * experience component.
 */

import { body } from 'express-validator';


export const addExperienceValidator = [
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.organisation').exists().isString().isLength({ min: 1, max: 100}),
  body('data.jobTitle').optional().isString().isLength({ min: 1, max: 100 }),
  body('data.description').optional().isString().isLength({ max: 400 }),
  body('data.startDate').exists().isDate(),
  body('data.endDate').optional().isDate()
];

export const updateExperienceValidator = [
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.organisation').optional().isString().isLength({ min: 1, max: 100}),
  body('data.jobTitle').optional().isString().isLength({ min: 1, max: 100 }),
  body('data.description').optional().isString().isLength({ max: 400 }),
  body('data.startDate').optional().isDate(),
  body('data.endDate').optional().isDate(),
  body('data.experienceID').exists().isInt()
];