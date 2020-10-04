/**
 * This file contains middleware that validate the data for endpoints in the
 * profile component.
 */

import { body } from 'express-validator';
import { isStrArr } from '../../middleware/validator';

/**
 * A list of middleware that validate data sent to add or update a profile.
 * These are the validation steps performed on each field:
 *
 *    email: required, is email and a maximum of 320 chars
 *    firstName: required, is string and between 1-50 chars
 *    lastName: required, is string and between 1-50 chars
 *    bio: optional, is string and a maximum of 320 chars
 *    DOB: optional and is date
 *    location: optional, is string and is a maximum of 100 chars
 *    lookingForWork: required and is boolean
 *    public: required and is boolean
 *    mobile: optional, is string and a maximum of 20 chars
 *    skills: optional, is string array and each skill is a maximum of 50 chars
 *    socialLinks: optional, is string array and each link is a maximum of 300
 *                 chars
 *    achievements: optional, is string array and each achievement is a maximum
 *                  of 50 chars
 */
export const profileValidator = [
  body('data.email', 'Invalid email').exists().isEmail().isLength({ max: 320 }),
  body('data.firstName').exists().isString().isLength({ min: 1, max: 50 }),
  body('data.lastName').exists().isString().isLength({ min: 1, max: 50 }),
  body('data.bio').optional().isString().isLength({ max: 1000 }),
  body('data.DOB').optional().isDate(),
  body('data.location').optional().isString().isLength({ max: 100 }),
  body('data.lookingForWork').exists().isBoolean(),
  body('data.public').exists().isBoolean(),
  body('data.mobile').optional().isString().isLength({ max: 20 }),
  body('skills').optional().custom(value => {
    isStrArr(value, 50);
  }),
  body('socialLinks').optional().custom(value => {
    isStrArr(value, 300);
  }),
  body('skills').optional().custom(value => {
    isStrArr(value, 50);
  })
]