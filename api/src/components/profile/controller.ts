/**
 * This file contains controller functions for the /api/profile endpoint. If it
 * makes sense to validate data, a controller function will first validate the
 * received data. Then the controller function will perform the database query
 * according to its corresponding function in the service file for this
 * component.
 */

import express from 'express';
import expressValidator from 'express-validator';
import { addUserService } from './service';

/**
 * addUser() vaidates profile data and then adds the user to the database.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addUser = (req: express.Request, res: express.Response,
  next: express.NextFunction) => {

    addUserService(req, res, next);
}