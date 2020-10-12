/**
 * This file acts as a wrapper to the database. Here, data is read and written
 * to the database for the profile component.
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

/**
 * getProfileService() retrieves profile information from the profile table in
 * the database. Adds the query result to the request object.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result rows if found, or an empty list if not.
 */
export const getProfileService = async (req: any,
                                        res: express.Response,
                                        next: express.NextFunction) => {
  const query: string = 'SELECT first_name, last_name, bio, location, \
  public, looking_for_work, gender, date_of_birth FROM profile WHERE \
  user_id=$1';
  const userID = req.params.id;
  try {
    const result: any = await req.poolClient.query(query, [userID]);
    return result;
  } catch (err) {
    next(err);
  }
}

/**
 * checkProfileService() checks whether a profile with the provided email
 * exists.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns true if it exists, false otherwise
 */
export const checkProfileService = async (req: any,
                                          res: express.Response,
                                          next: express.NextFunction) => {
  const query: string = 'SELECT 1 FROM profile WHERE email=$1';
  const email: string = req.user[process.env.EMAIL_KEY];
  try {
    const result: any = await req.poolClient.query(query, [email]);
    if (result.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  }
  catch (err) {
    next(err);
  }
}

/**
 * addProfileService() adds a new profile to the database based on the
 * data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the user_id of the added profile
 */
export const addProfileService = async (req: any,
                                          res: express.Response,
                                          next: express.NextFunction) => {
  const query: string = 'INSERT INTO profile(email, first_name, \
    last_name, bio, date_of_birth, location, looking_for_work, public, \
    gender, join_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);';
  const queryParams = [
    req.user[process.env.EMAIL_KEY],
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
  try {
    const result: any = await req.poolClient.query(query, queryParams);
    return result.rows[0].user_id;
  } catch (err) {
    next(err);
  }
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