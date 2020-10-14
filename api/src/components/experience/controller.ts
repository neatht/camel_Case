/**
 * This file contains controller functions for the /api/experience endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { addExperienceService, getExperienceService } from './service';
import { checkProfileService, checkPublicService } from '../../helpers/service';
import { profile } from 'console';

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

/**
 * getExperiences() gets the experiences of a user with user ID provided in
 * route parameter and sends a JSON response to the client.
 *
 * First checks if profile with ID exists, then checks if it is public,
 * then finally retrieves experiences.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getExperiences = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.params.userID;
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      res.status(404);
      return res.json({
        status: 'error',
        message: 'User does not exist.'
      });
    }
    const profileIsPublic = await checkPublicService(req, next, userID);
    if (!profileIsPublic) {
      res.status(401);
      return res.json({
        status: 'error',
        message: 'User has profile set to private.'
      });
    }
    const experiences = await getExperienceService(req, res, next);
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