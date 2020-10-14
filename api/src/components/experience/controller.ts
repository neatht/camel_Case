/**
 * This file contains controller functions for the /api/experience endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { addExperienceService } from './service';

/**
 * addExperience() adds an experience to the experience table in the database
 * and sends a JSON response to the client.
 *
 * User must be authenticated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addExperience = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const experienceID = await addExperienceService(req, res, next);
    console.log(`Experience created for userID: ${req.user.sub.split('|')[1]}`);
    req.poolClient.end();
    res.status(200);
    return res.json({
      status: 'success',
      data: {
        experienceID
      }
    })
  } catch (err) {
    next(err);
  }
}