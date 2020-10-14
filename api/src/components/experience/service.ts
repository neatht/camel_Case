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