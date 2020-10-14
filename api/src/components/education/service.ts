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

/**
 * addEducationService() adds a new education to the database based on the
 * data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the education_id field of the added education
 */
export const addEducationService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'INSERT INTO education(institution, qualification, \
    description, location, start_date, end_date, user_id) VALUES($1, $2, $3, \
    $4, $5, $6, $7) RETURNING education_id AS "educationID";';
  const queryParams: any[] = [
    req.body.data.institution,
    req.body.data.qualification,
    req.body.data.description,
    req.body.data.location,
    req.body.data.startDate,
    req.body.data.endDate,
    req.user.sub.split('|')[1],
  ];
  const queryResult: any = await service(req, next, query, queryParams);
  return queryResult.rows[0].educationID;
}