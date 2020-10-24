/**
 * This file contains middleware that validate the data for endpoints in the
 * skills component.
 */

import { body } from 'express-validator';
import { isStrArr } from '../../middleware/validator'
// import { isEnum } from '../../middleware/validator';

/**
 * A list of middleware that validate data sent to add or update the list of skills.
 * These are the validation steps performed on each field:
 *
 *    TODO add these
 */

/*export const skillsValidator = [
  body('data.skills').exists().custom((val) => {
    return isStrArr(val);
  }),
]*/

export const skillValidator = [
  body('data.skill').exists().isString().isLength({min: 1, max: 50}),
]