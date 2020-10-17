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
 * getAchievementsService() retrieves the list of achievements of a user, returning an object
 * representing the achievements.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result if profile found, or null if profile not found.
 */
export const getAchievementsService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT achievements, public \
                         FROM profile \
                         WHERE user_id=$1';
  const queryParams: any[] = [req.params.userID];
  const queryResult: any = await service(req, next, query, queryParams);
  console.log(queryResult);

  if (queryResult.rowCount !== 0) {
    return queryResult.rows[0];
  } else {
    return null;
  }
}


/**
 * addAchievementService() adds a new Achievement to the list of achievements in a users profile.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const updateAchievementService = async (req: any, res: express.Response, next: express.NextFunction, achievements: object[]) => {
  const query: string = 'UPDATE profile \
                         SET achievements = $1 \
                         WHERE user_id=$2';
  const queryParams: any[] = [achievements, req.user.sub.split('|')[1]];
  await service(req, next, query, queryParams);
}

/**
 * checkProfileService() checks whether the profile of a given user
 * exists.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns true if it exists, false otherwise
 */
export const checkOthersProfileService = async (req: any, res: express.Response, next: express.NextFunction, userID: any) => {
  const query: string = 'SELECT 1 \
                         FROM profile \
                         WHERE user_id=$1';
  const queryParams: any[] = [userID];
  const queryResult: any = await service(req, next, query, queryParams);
  if (queryResult.rowCount === 0) {
    return false;
  } else {
    return true;
  }
}

/**
 * getOwnAchievementsService() retrieves the list of achievements of a user, returning an object
 * representing the achievements.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result if profile found, or null if profile not found.
 */
export const getOwnAchievementsService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT achievements \
                         FROM profile \
                         WHERE user_id=$1';
  const queryParams: any[] = [req.user.sub.split('|')[1]];
  const queryResult: any = await service(req, next, query, queryParams);
  if (queryResult.rowCount !== 0) {
    return queryResult.rows[0];
  } else {
    return null;
  }
}