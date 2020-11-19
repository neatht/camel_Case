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

/**
 * checkEducationService() checks if an education with a given experience ID
 * exists.
 *
 * Expects education ID in req.body.data.educationID
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns true if education exists, false if it does not exist
 */
export const checkEducationService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT EXISTS(SELECT 1 FROM education WHERE \
    education_id=$1)';
  const queryParams = [req.body.data.educationID];
  const queryResult = await service(req, next, query, queryParams);
  return queryResult.rows[0].exists;
}

/**
 * updateEducationService() updates an education in the database based on the
 * data provided in the body.
 *
 * Expects education ID in req.body.data.educationID
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the education_id field of the added education
 */
export const updateEducationService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'UPDATE education SET \
    institution = COALESCE($1, institution), \
    qualification = COALESCE($2, qualification), \
    description = COALESCE($3, description), \
    location = COALESCE($4, location), \
    start_date = COALESCE($5, start_date), \
    end_date = COALESCE($6, end_date), \
    user_id = $7 \
    WHERE education_id = $8';
  const queryParams = [
    req.body.data.institution,
    req.body.data.qualification,
    req.body.data.description,
    req.body.data.location,
    req.body.data.startDate,
    req.body.data.endDate,
    req.user.sub.split('|')[1],
    req.body.data.educationID
  ];
  await service(req, next, query, queryParams);
}


/**
 * deleteEducationService() deletes an education with a provided education_id
 *
 * Expects education ID in req.body.data.educationID
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const deleteEducationService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'DELETE FROM education WHERE education_id = $1'
  const queryParams = [req.body.data.educationID];
  await service(req, next, query, queryParams);
}