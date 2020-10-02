/**
 * This file acts as a wrapper to the database. Here, data is read and written
 * to the database for the profile component.
 */

import express from 'express';
import { query } from '../../db';
import { pool } from '../../config/postgres';

/**
 * addUserService() adds a user to the database after profile data has been
 * validated.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addUserService = (req: express.Request, res: express.Response,
  next: express.NextFunction) => {

    pool.connect((connectErr: any, client: any, done: any) => {
      // Error connecting to database
      if (connectErr) {
        res.json({
          status: "error",
          message: "Unable to communicate with database."
        });
        return next(connectErr);
      }
      const queryText: string = 'INSERT INTO profile(email, first_name, \
        last_name, bio, date_of_birth, location, looking_for_work, public, \
        mobile, skills, social_links, achievements, join_date) VALUES($1, $2, \
        $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);';
      const queryValues = [
        req.body.data.email,
        req.body.data.firstName,
        req.body.data.lastName,
        req.body.data.bio,
        req.body.data.DOB,
        req.body.data.location,
        req.body.data.lookingForWork.toString(),
        req.body.data.public.toString(),
        req.body.data.mobile,
        req.body.data.skills,
        req.body.data.socialLinks,
        req.body.data.achievements,
        new Date()
      ];
      client.query(queryText, queryValues, (queryErr: any, queryRes: any) => {
        done();
        // Error executing the query
        if (queryErr) {
          res.json({
            status: "error",
            message: "Something went wrong executing that query."
          });
          return next(queryErr);
        }
        console.log(`Profile created for email: ${req.body.data.email}`);
        res.json({
          status: "success",
          data: null
        });
      });
    });
}
