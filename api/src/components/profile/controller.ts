/**
 * This file contains controller functions for the /api/profile endpoint. If it
 * makes sense to validate data, a controller function will first check the
 * validation result. If there were no validation errors, the controller will
 * then call the corresponding service function to execute the database query.
 * Then the controller function will use the result of this call to decide
 * which response to send.
 */

import express from 'express';
import { validationResult } from 'express-validator';
import { getProfileService, checkProfileService, addProfileService, updateProfileService } from './service';
import dotenv from 'dotenv';
dotenv.config();

/**
 * getUser() gets a user by its ID in the database
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getUser = async (req: any, res: express.Response,
                              next: express.NextFunction) => {
  try {
    const queryResult = await getProfileService(req, res, next);
    if (queryResult.rowCount === 0) {
      res.status(404);
      res.json({
        status: 'error',
        message: 'Could not find a profile by that ID.'
      });
    } else {
      const profileData = queryResult.rows[0];
      if (profileData.public) {
        res.status(200);
        res.json({
          status: 'success',
          data: {
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            bio: profileData.bio,
            location: profileData.location,
            lookingForWork: profileData.looking_for_work,
            public: profileData.public,
            gender: profileData.gender,
            DOB: profileData.date_of_birth
          }
        });
      } else {
        res.status(401);
        res.json({
          status: 'success',
          data: {
            firstName: profileData.first_name,
            lastName: profileData.last_name,
            public: profileData.public
          }
        });
      }
    }
  } catch (err) {
    next(err);
  }
}

/**
 * addUser() checks the validation result for profile data and then adds
 * the user to the database by calling addUserService().
 *
 * First checks whether profile exists. If a profile does not exist, then one
 * is created.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addUser = async (req: any, res: express.Response,
  next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    res.json({
      status: 'fail',
      data: errors.array()
    });
  } else {
    try {
      const profileExists: boolean = await checkProfileService(req, res, next);
      if (profileExists) {
        res.status(403);
        res.json({
          status: 'error',
          message: 'Profile already exists.'
        });
      } else {
        const userID: number = await addProfileService(req, res, next);
        const email: string = req.user[process.env.EMAIL_KEY]
        console.log(`Profile created for email: ${email}`);
        res.status(200);
        res.json({
          status: 'success',
          userID
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

/**
 * updateUser() checks the validation result for profile data and then adds
 * the user to the database by calling updateUserService().
 *
 * First checks whether profile exists. If a profile does exist, then the
 * information is updated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const updateUser = async (req: any, res: express.Response,
  next: express.NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    res.json({
      status: 'fail',
      data: errors.array()
    });
  } else {
    try {
      const profileExists: boolean = await checkProfileService(req, res, next);
      if (!profileExists) {
        res.status(403);
        res.json({
          status: 'error',
          message: 'Profile does not exist.'
        });
      } else {
        const userID: string = await updateProfileService(req, res, next);
        const email: string = req.user[process.env.EMAIL_KEY];
        console.log(`Profile updated for email: ${email}`);
        res.status(200);
        res.json({
          status: 'success',
          userID
        });
      }
    } catch (err) {
      next(err);
    }
  }
}