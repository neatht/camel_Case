/**
 * This file acts as a wrapper to the database. Here, data is read from and
 * written to the database for the education component.
 */

import express from 'express';
import { service } from '../../helpers/service';

/**
 * getOwnEducationService() retrieves the education of an authenticated
 * user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns a list of the education
 */
export const getOwnEducationService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT institution, qualification, description, \
  location, start_date as "startDate", end_date AS "endDate", \
  education_id as "educationID" FROM education WHERE user_id=$1;';
  const queryParams: any[] = [req.user.sub.split('|')[1]];
  const queryResult: any = await service(req, next, query, queryParams);
  return queryResult.rows;
}

/**
 * getEducationService() retrieves the education of a user from the
 * database.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns a list of the education
 */
export const getEducationService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT institution, qualification, description, \
  location, start_date as "startDate", end_date AS "endDate", \
  education_id as "educationID" FROM education WHERE user_id=$1;';
  const queryParams: any[] = [req.params.userID];
  const queryResult: any = await service(req, next, query, queryParams);
  return queryResult.rows;
}