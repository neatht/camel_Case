/**
 * This file contains middleware that validate the data for endpoints in the
 * experience component.
 */

import { body } from 'express-validator';

/**
 * A list of middleware that validate data sent to add or update an experience.
 * These are the validation steps performed on each field:
 *
 *    location: optional, is string and a maximum of 100 chars
 *    organisation: required, is string and between 1 and 100 chars
 *    jobTitle: required, is string and is between 1 and 100 chars
 *    description: optional, is string and is a maximum of 400 chars
 *    startDate: required and is date
 *    endDate: required and is date
 */
export const experienceValidator = [
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.organisation').exists().isString().isLength({ min: 1, max: 100}),
  body('data.jobTitle').exists().isString().isLength({ min: 1, max: 100 }),
  body('data.description').optional().isString().isLength({ max: 400 }),
  body('data.startDate').exists().isDate(),
  body('data.endDate').optional().isDate()
]