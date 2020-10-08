/**
 * This file acts as a wrapper to the database. Here, data is read and written
 * to the database for the profile component.
 */

import express from 'express';
import { pool } from '../../config/postgres';

/**
 * addProfileService() first checks whether a user is already in the database.
 * If they are not, then the user profile is added.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const addProfileService = (req: express.Request, res: express.Response,
                                  next: express.NextFunction) => {
  pool.connect((connectErr: any, client: any, done: any) => {
    /**
     * Return an status 500 error message if server is unable to connect with
     * the database.
     */
    if (connectErr) {
      res.status(500);
      res.json({
        status: "error",
        message: "Unable to communicate with database."
      });
      return next(connectErr);
    }

    /**
     * Query the database to find out whether a profile with the user's email
     * already exists.
     */

    // FIX LATER, EMAIL IS MANUALLY SET, NEED TO GET FROM AUTH0 ============================+++
    const email: string = 'testman@test.com';

    const queryTextExists: string = 'SELECT 1 FROM profile WHERE email=$1';
    client.query(queryTextExists, [email], (queryErr: any, queryRes: any) => {
      // Error executing query
      if (queryErr) {
        res.status(500);
        res.json({
          status: "error",
          message: "Could not check if user exists."
        });
        return next(queryErr);
      }
      // User profile already exists
      if (queryRes.rows.length !== 0) {
        res.status(403);
        res.json({
          status: 'error',
          message: 'User profile already exists.'
        });
        done();
      }
      // User profile does not yet exist
      else {
        const queryText: string = 'INSERT INTO profile(email, first_name, \
          last_name, bio, date_of_birth, location, looking_for_work, public, \
          gender, skills, social_links, achievements, join_date) VALUES($1, \
          $2, $3, $4, $5, $6, $7, $8, $9, $10);';
        const queryValues = [
          email,
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
      /**
       * Query the database to add a new profile row with the information
       * supplied by the user.
       */
        client.query(queryText, queryValues, (queryErr: any, queryRes: any) => {
          // Error executing query
          if (queryErr) {
            res.status(500);
            res.json({
              status: "error",
              message: "Could not create profile."
            });
            return next(queryErr);
          }
          console.log(`Profile created for email: ${req.body.data.email}`);
          res.status(200);
          res.json({
            status: "success"
          });
          done();
        }
  });
}

      const queryText: string = 'INSERT INTO profile(email, first_name, \
        last_name, bio, date_of_birth, location, looking_for_work, public, \
        gender, skills, social_links, achievements, join_date) VALUES($1, $2, \
        $3, $4, $5, $6, $7, $8, $9, $10);';
      const queryValues = [
        email,
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
      client.query(queryText, queryValues, (queryErr: any, queryRes: any) => {
        done();
        // Error executing the query
        if (queryErr) {
          res.json({
            status: "error",
            message: "Something went wrong executing a query."
          });
          return next(queryErr);
        }
        console.log(`Profile created for email: ${req.body.data.email}`);
        res.json({
          status: "success",
          data: null
        });
      });
    // });

/**
 * getProfileService() retrieves profile information from the profile table in
 * the database. 
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getProfileService = (req: express.Request, res: express.Response,
                                  next: express.NextFunction) => {
  pool.connect((connectErr: any, client: any, done: any) => {
    /**
     * Return an status 500 error message if server is unable to connect with
     * the database.
     */
    if (connectErr) {
      res.status(500);
      res.json({
        status: 'error',
        message: 'Unable to communicate with database.'
      });
      return next(connectErr);
    }

    /**
     * Send a query to the database asking for these columns: [first_name,
     * last_name, bio, location, public, lookingForWork] where user_id is the
     * ID in the request parameter.
     */

    // FIX LATER, EMAIL IS MANUALLY SET, NEED TO GET FROM AUTH0 ============================+++
    const email: string = 'testman@test.com';

    const userID: string = req.params.id;
    const queryText: string = 'SELECT first_name, last_name, bio, location, \
      public, lookingForWork FROM profile WHERE user_id=$1';
    client.query(queryText, [userID], (queryErr: any, queryRes: any) => {
      // Error executing query
      if (queryErr) {
        res.status(500);
        res.json({
          status: 'error',
          message: 'Something went wrong executing a query.'
        });
        return next(queryErr);
      }
      // Profile not found
      if (queryRes.rows.length === 0) {
        res.status(404);
        res.json({
          status: 'error',
          messsage: 'Profile not found.'
        })
      }
      // Profile found
      else {
        const profileInfo = queryRes.rows[0];
        const profileBelongsToUser = email === profileInfo.email;
        const profileIsPublic = profileInfo.public;
        /**
         * If the profile belongs to the user, or the profile is public,
         * provide the full profile information.
         */
        if (profileBelongsToUser || profileIsPublic) {
          res.status(200);
          res.json({
            status: 'success',
            data: {
              firstName: profileInfo.first_name,
              lastName: profileInfo.last_name,
              bio: profileInfo.bio,
              location: profileInfo.location,
              lookingForWork: profileInfo.looking_for_work,
              public: profileInfo.public,
              gender: profileInfo.gender,
              DOB: profileInfo.DOB
            }
          });
        }
        /**
         * If the profile does not belong to the user and it is private, 
         * provide limited profile information.
         */
        else {
          res.status(401);
          res.json({
            status: 'success',
            data: {
              firstName: profileInfo.first_name,
              lastName: profileInfo.last_name,
              public: profileInfo.public
            }
          })
        }
      }
  });
});
}