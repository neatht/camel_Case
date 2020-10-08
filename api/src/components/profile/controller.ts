/**
 * This file contains controller functions for the /api/profile endpoint. If it
 * makes sense to validate data, a controller function will first check the
 * validation result. If there were no validation errors, the controller will
 * then call the corresponding service function to execute the database query.
 */

import express from 'express';
import { validationResult } from 'express-validator';
import { addProfileService, getProfileService } from './service';

/**
 * addUser() checks the validation result for profile data and then adds
 * the user to the database by calling addUserService().
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addUser = (req: express.Request, res: express.Response,
  next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        status: 'fail',
        data: errors.array()
      })
    }
    addProfileService(req, res, next);
}

/**
 * getUser() gets a user by its ID in the database
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getUser = (req: express.Request, res: express.Response,
  next: express.NextFunction) => {
    getProfileService(req, res, next);
}
