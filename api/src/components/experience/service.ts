/**
 * This file acts as a wrapper to the database. Here, data is read from and
 * written to the database for the experience component.
 */

import express from 'express';
import { service } from '../../helpers/service';

/**
 * addExperienceService() adds a new experience to the database based on the
 * data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the experience_id field of the added experience
 */
export const addExperienceService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'INSERT INTO experience(location, organisation, \
    job_title, description, start_date, end_date, user_id) VALUES($1, $2, $3, \
    $4, $5, $6, $7) RETURNING experience_id AS "experienceID";';
  const queryParams: any[] = [
    req.body.data.location,
    req.body.data.organisation,
    req.body.data.jobTitle,
    req.body.data.description,
    req.body.data.startDate,
    req.body.data.endDate,
    req.user.sub.split('|')[1],
  ];
  const queryResult: any = await service(req, next, query, queryParams);
  return queryResult.rows[0].experienceID;
}

/**
 * updateExperienceService() updates an experience in the database based on the
 * data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the experience_id field of the added experience
 */
export const updateExperienceService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'UPDATE experience \
  SET location = $1, organisation = $2, job_title = $3, description = $4, \
  start_date = $5, end_date = $6, user_id = $7 WHERE experience_id = $8;'
  const queryParams = [
    req.body.data.location,
    req.body.data.organisation,
    req.body.data.jobTitle,
    req.body.data.description,
    req.body.data.startDate,
    req.body.data.endDate,
    req.user.sub.split('|')[1],
    req.body.data.experienceID
  ];
  await service(req, next, query, queryParams);
}

/**
 * checkExperience() checks if an experience with a given experience ID
 * exists.
 *
 * Expects experience ID in req.body.data.experienceID
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns true if experience exists, false if it does not exist
 */
export const checkExperience = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT EXISTS(SELECT 1 FROM experience WHERE \
    experience_id=$1)';
  const queryParams = [req.body.data.experienceID];
  const queryResult = await service(req, next, query, queryParams);
  return queryResult.rows[0].exists;
}

/**
 * getExperiencesService() retrieves the experiences of a user from the
 * database.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns a list of the experiences
 */
export const getExperienceService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT organisation, job_title AS "jobTitle", \
  description, start_date AS "startDate", end_date AS "endDate", experience_id \
  AS "experienceID" FROM experience WHERE user_id=$1;';
  const queryParams: any[] = [req.params.userID];
  const queryResult: any = await service(req, next, query, queryParams);
  return queryResult.rows;
}

/**
 * checkExperience() deletes an experience with a provided experience_id
 *
 * Expects experience ID in req.body.data.experienceID
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const deleteExperienceService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'DELETE FROM experience WHERE experience_id = $1'
  const queryParams = [req.body.data.experienceID];
  await service(req, next, query, queryParams);
}

/**
 * getOwnExperiencesService() retrieves the experiences of an authenticated
 * user.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns a list of the experiences
 */
export const getOwnExperiencesService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT organisation, job_title AS "jobTitle", \
  description, start_date AS "startDate", end_date AS "endDate", experience_id \
  AS "experienceID" FROM experience WHERE user_id=$1;';
  const queryParams: any[] = [req.user.sub.split('|')[1]];
  const queryResult: any = await service(req, next, query, queryParams);
  return queryResult.rows;
}