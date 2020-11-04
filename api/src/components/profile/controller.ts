/**
 * This file contains controller functions for the /api/profile endpoint. The
 * controller calls the corresponding service function to execute a database
 * query. Then the controller function will use the result of this call to
 * decide which response to send.
 */

import express from 'express';
import { getProfileService, checkProfileService, addProfileService, updateProfileService, deleteProfileService, getOwnProfileService } from './service';
import dotenv from 'dotenv';
dotenv.config();

/**
 * getUser() gets a user by its ID in the database and sends a JSON response
 * to the client.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getUser = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const result = await getProfileService(req, res, next);
    req.poolClient.release();
    if (result === null) {
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Could not find a profile by that ID'
      });
    } else {
      if (result.public) {
        if (result.public_location) {
          res.status(200);
          return res.json({
            status: 'success',
            data: {
              firstName: result.first_name,
              lastName: result.last_name,
              bio: result.bio,
              location: result.location,
              lookingForWork: result.looking_for_work,
              public: result.public,
              gender: result.gender,
              DOB: result.date_of_birth,
              publicLocation: result.public_location
            }
          });
        } else {
          res.status(200);
          return res.json({
            status: 'success',
            data: {
              firstName: result.first_name,
              lastName: result.last_name,
              bio: result.bio,
              lookingForWork: result.looking_for_work,
              public: result.public,
              gender: result.gender,
              DOB: result.date_of_birth,
              publicLocation: result.public_location
            }
          });
        }

      } else {
        res.status(200);
        return res.json({
          status: 'success',
          data: {
            firstName: result.first_name,
            lastName: result.last_name,
            public: result.public
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
}

/**
 * addUser() adds a profile to the profile table in the database for the
 * authenticated user. Before this, addUser() checks if the profile already
 * exists. Sends a JSON response to the client.
 *
 * Requires that the user is authenticated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addUser = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (profileExists) {
      req.poolClient.release();
      res.status(403);
      return res.json({
        status: 'error',
        message: 'Profile already exists.'
      });
    } else {
      await addProfileService(req, res, next);
      console.log(`Profile created for userID: ${req.user.sub.split('|')[1]}`);
      req.poolClient.release();
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
 * updateUser() irst checks whether profile exists. If a profile does exist,
 * then the information is updated. Sends a JSON response to the client.
 *
 * Requires that the user is authenticated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const updateUser = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      await updateProfileService(req, res, next);
      console.log(`Profile updated for userID: ${req.user.sub.split('|')[1]}`);
      req.poolClient.release();
      res.status(200);
      return res.json({
        status: 'success',
      });
    }
  } catch (err) {
    next(err);
  }
}

/**
 * deleteUser() First checks whether profile exists. If a profile does exist,
 * then the profile is deleted. Sends a JSON response to the client.
 *
 * Requires that the user is authenticated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const deleteUser = async (req: any, res: express.Response,
  next: express.NextFunction) => {
  try {
    const profileExists: boolean = await checkProfileService(req, res, next);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    } else {
      await deleteProfileService(req, res, next);
      console.log(`Profile deleted for userID: ${req.user.sub.split('|')[1]}`);
      req.poolClient.release();
      res.status(200);
      return res.json({
        status: 'success'
      })
    }
  } catch (err) {
    next(err);
  }
}

/**
 * getOwnUser() gets an authenticated user's profile from the profile table
 * in the database. Sends a JSON response to the client.
 *
 * Requires that the user is authenticated and that the checkIsOwner()
 * middleware is passed.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getOwnUser = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const result = await getOwnProfileService(req, res, next);
    req.poolClient.release();
    if (result === null) {
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Could not find a profile by that ID'
      });
    } else {
      res.status(200);
      return res.json({
        status: 'success',
        data: {
          firstName: result.first_name,
          lastName: result.last_name,
          bio: result.bio,
          location: result.location,
          lookingForWork: result.looking_for_work,
          public: result.public,
          gender: result.gender,
          DOB: result.date_of_birth,
          publicLocation: result.public_location
        }
      });
    }
  } catch (err) {
    next(err);
  }
}