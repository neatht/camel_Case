/**
 * This file contains middleware that validate the data for endpoints in the
 * links component.
 */

import { body } from 'express-validator';
import { isStrArr } from '../../middleware/validator'
// import { isEnum } from '../../middleware/validator';

/**
 * A list of middleware that validate data sent to add or update the list of links.
 * These are the validation steps performed on each field:
 *
 *    TODO add these
 */

/*export const linksValidator = [
  body('data.links').exists().custom((val) => {
    return isStrArr(val);
  }),
]*/

export const linkValidator = [
  body('data.link').exists().isString().isLength({min: 1, max: 300}),
]