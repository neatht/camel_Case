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
 * getSkillsService() retrieves the list of skills of a user, returning an object
 * representing the skills.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result if profile found, or null if profile not found.
 */
export const getSkillsService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT skills, public \
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
 * addSkillService() adds a new skill to the list of skills in a users profile.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const updateSkillService = async (req: any, res: express.Response, next: express.NextFunction, skills: object[]) => {
  const query: string = 'UPDATE profile \
                         SET skills = $1 \
                         WHERE user_id=$2';
  const queryParams: any[] = [skills, req.user.sub.split('|')[1]];
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
 * getOwnSkillsService() retrieves the list of skills of a user, returning an object
 * representing the skills.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result if profile found, or null if profile not found.
 */
export const getOwnSkillsService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT skills \
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