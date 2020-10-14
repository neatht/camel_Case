/**
 * This file contains controller functions for the /api/experience endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { getOwnEducationService } from './service';
import { checkProfileService, checkPublicService } from '../../helpers/service';
import { profile } from 'console';

/**
 * getOwnEducation() gets an authenticated user's education from the
 * education table in the database. Sends a JSON response to the client.
 *
 * Requires that the user is authenticated and that the checkIsOwner()
 * middleware is passed.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getOwnEducation = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }
    const experiences = await getOwnEducationService(req, res, next);
    req.poolClient.end();
    res.status(200);
    return res.json({
      status: 'success',
      data: {
        experiences
      }
    });
  } catch (err) {
    next(err);
  }
}