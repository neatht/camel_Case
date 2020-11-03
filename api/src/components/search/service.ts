/**
 * This file acts as a wrapper to the database. Here, data is read and written
 * to the database for the profile component.
 */

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

/**
 * searchProfileService() searches the database for projects matching the query
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result rows if found, or an empty list if not.
 */
export const searchProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const keywords : string = '%' + req.params.query.split(' ').join('%') + '%';
  const query : string = 'SELECT project.project_id, project.project_name, profile.first_name, profile.last_name, profile.user_id \
                          FROM project INNER JOIN profile ON project.user_id = profile.user_id \
                          WHERE project.project_name LIKE $1 AND profile.public = TRUE';
  try {
    const result: any = await req.poolClient.query(query, [keywords]);
    return result;
  } catch (err) {
    next(err);
  }
}

/**
 * searchProfileService() searches the database for profiles matching the query
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result rows if found, or an empty list if not.
 */
 export const searchUserService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const keywords : string = '%' + req.params.query.split(' ').join('%') + '%';
  const query : string = 'SELECT user_id, first_name, last_name \
                          FROM profile \
                          WHERE CONCAT(first_name, \' \', last_name) LIKE $1';

  try {
    const result: any = await req.poolClient.query(query, [keywords]);
    return result;
  } catch (err) {
    next(err);
  }
 }