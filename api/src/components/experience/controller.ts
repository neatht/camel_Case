/**
 * This file contains controller functions for the /api/experience endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { addExperienceService, updateExperienceService, checkExperience, getExperienceService, deleteExperienceService, getOwnExperiencesService } from './service';
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
 * updateExperience() updates an experience in the experience table of the
 * database and sends a JSON response to the client.
 *
 * User must authenticated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const updateExperience = async (req: any, res: express.Response, next: express.NextFunction) => {
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
    
    const experienceExists = await checkExperience(req, res, next);
    if (!experienceExists) {
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'The experience you tried to update does not exist.'
      });
    }
    await updateExperienceService(req, res, next);
    console.log(`Experience with experience_id: ${req.body.data.experienceID} updated for user_id: ${req.user.sub.split('|')[1]}`);
    req.poolClient.end();
    res.status(200);
    return res.json({
      status: 'success'
    });
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
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }
    const profileIsPublic = await checkPublicService(req, next, userID);
    if (!profileIsPublic) {
      req.poolClient.end();
      res.status(401);
      return res.json({
        status: 'error',
        message: 'User has profile set to private.'
      });
    }
    const experiences = await getExperienceService(req, res, next);
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

/**
 * deleteExperience() deletes an experience from the experience table in the
 * database.
 *
 * User must authenticated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const deleteExperience = async (req: any, res: express.Response, next: express.NextFunction) => {
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
    
    const experienceExists = await checkExperience(req, res, next);
    if (!experienceExists) {
      req.poolClient.end();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'The experience you tried to delete does not exist.'
      });
    } else {
      await deleteExperienceService(req, res, next);
      console.log(`Experience with experience_id: ${req.body.data.experienceID} deleted for user_id: ${req.user.sub.split('|')[1]}`);
      req.poolClient.end();
      res.status(200);
      return res.json({
        status: 'success'
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * getOwnExperiences() gets an authenticated user's experience from the
 * experience table in the database. Sends a JSON response to the client.
 *
 * Requires that the user is authenticated and that the checkIsOwner()
 * middleware is passed.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getOwnExperiences = async (req: any, res: express.Response, next: express.NextFunction) => {
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
    const experiences = await getOwnExperiencesService(req, res, next);
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