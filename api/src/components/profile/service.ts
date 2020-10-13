/**
 * This file acts as a wrapper to the database. Here, data is read from and
 * written to the database for the profile component.
 */

import express from 'express';
import { service } from '../../helpers/service';

import dotenv from 'dotenv';
import { Result } from 'express-validator';
dotenv.config();

/**
 * getProfileService() retrieves profile information from the profile table in
 * the database. Will return limited data if the profile is private, and full
 * data if the profile is public.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result if profile found, or null if profile not found.
 */
export const getProfileService = async (req: any,
                                        res: express.Response,
                                        next: express.NextFunction) => {
  const query: string = 'SELECT first_name, last_name, bio, location, \
    public, looking_for_work, gender, date_of_birth FROM profile WHERE \
    user_id=$1';
  const queryParams: any[] = [req.params.userID];
  const queryResult: any = await service(req, next, query, queryParams);
  if (queryResult.rowCount !== 0) {
    console.log(queryResult.rows[0]);
    return queryResult.rows[0];
  } else{
    return null;
  }
}

/**
 * checkProfileService() checks whether the profile of the authenticated user
 * exists.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns true if it exists, false otherwise
 */
export const checkProfileService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT 1 FROM profile WHERE user_id=$1';
  const queryParams: any[] = [req.user.sub.split('|')[1]];
  const queryResult: any = await service(req, next, query, queryParams);
  if (queryResult.rowCount === 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * addProfileService() adds a new profile to the database based on the
 * data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addProfileService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'INSERT INTO profile(user_id, first_name, \
    last_name, bio, date_of_birth, location, looking_for_work, public, \
    gender, join_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
  const queryParams = [
    req.user.sub.split('|')[1],
    req.body.data.firstName,
    req.body.data.lastName,
    req.body.data.bio,
    req.body.data.DOB,
    req.body.data.location,
    req.body.data.lookingForWork.toString(),
    req.body.data.public.toString(),
    req.body.data.gender,
    new Date()
  ];
  await service(req, next, query, queryParams);
}

/**
 * updateProfileService() updates the information of a profile in the database
 * based on the data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the user_id of the updated profile
 */
export const updateProfileService = async (req: any,
  res: express.Response,
  next: express.NextFunction) => {
  const query: string = 'UPDATE profile \
  SET first_name = $1, last_name = $2, bio = $3, date_of_birth = $4, \
  location = $5, looking_for_work = $6, public = $7, gender = $8 \
  WHERE email = $9 RETURNING *;'
  const queryParams = [
    req.body.data.firstName,
    req.body.data.lastName,
    req.body.data.bio,
    req.body.data.DOB,
    req.body.data.location,
    req.body.data.lookingForWork.toString(),
    req.body.data.public.toString(),
    req.body.data.gender,
    req.user[process.env.EMAIL_KEY],
  ];
  try {
    const result: any = await req.poolClient.query(query, queryParams);
    return result.rows[0].user_id;
  } catch (err) {
    next(err);
  }
}

/**
 * deleteProfileService() deletes a user's profile from the database.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const deleteProfileService = async (req: any,
  res: express.Response,
  next: express.NextFunction) => {
  const query: string = 'DELETE FROM profile WHERE email = $1'
  const queryParams = [
    req.user[process.env.EMAIL_KEY],
  ];
  try {
    await req.poolClient.query(query, queryParams);
    return;
  } catch (err) {
    next(err);
  }
}