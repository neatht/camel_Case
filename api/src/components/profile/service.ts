import { doesNotMatch } from 'assert';
/**
 * This file acts as a wrapper to the database. Here, data is read and written
 * to the database for the profile component.
 */

import express from 'express';
import { pool } from '../../config/postgres';

/**
 * getProfileService() retrieves profile information from the profile table in
 * the database. Adds the query result to the request object.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the query result rows if found, or an empty list if not.
 */
export const getProfileService = async (req: any,
                                        res: express.Response,
                                        next: express.NextFunction) => {
  const query: string = 'SELECT first_name, last_name, bio, location, \
  public, looking_for_work, gender, date_of_birth FROM profile WHERE \
  user_id=$1';
  const userID = req.params.id;
  try {
    const result: any = await req.poolClient.query(query, [userID]);
    return result;
  } catch (err) {
    next(err);
  }
}

/**
 * checkProfileService() checks whether a profile with the provided email
 * exists.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns true if it exists, false otherwise
 */
export const checkProfileService = async (req: any,
                                          res: express.Response,
                                          next: express.NextFunction) => {
  const query: string = 'SELECT 1 FROM profile WHERE email=$1';
  const email: string = req.user.email;
  try {
    const result: any = await req.poolClient.query(query, [email]);
    if (result.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  }
  catch (err) {
    next(err);
  }
}

/**
 * addProfileService() adds a new profile to the database based on the
 * data provided in the body.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 *
 * @returns the user_id of the added profile
 */
export const addProfileService = async (req: any,
                                          res: express.Response,
                                          next: express.NextFunction) => {
  const query: string = 'INSERT INTO profile(email, first_name, \
    last_name, bio, date_of_birth, location, looking_for_work, public, \
    gender, skills, social_links, achievements, join_date) VALUES($1, \
    $2, $3, $4, $5, $6, $7, $8, $9, $10);';
  const queryParams = [
    req.user.email,
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
  try {
    const result: any = await req.poolClient.query(query, [queryParams]);
    return result.rows[0].user_id;
  } catch (err) {
    next(err);
  }
}
// /**
//  * addProfileService() first checks whether a user is already in the database.
//  * If they are not, then the user profile is added.
//  *
//  * @param req - the express Request object
//  * @param res - the express Response object
//  * @param next - the express NextFunction object
//  */
// export const addProfileService = (req: express.Request, res: express.Response,
//                                   next: express.NextFunction) => {
//   pool.connect((connectErr: any, client: any, done: any) => {
//     /**
//      * Return an status 500 error message if server is unable to connect with
//      * the database.
//      */
//     if (connectErr) {
//       res.status(500);
//       res.json({
//         status: "error",
//         message: "Unable to communicate with database."
//       });
//       return next(connectErr);
//     }

//     /**
//      * Query the database to find out whether a profile with the user's email
//      * already exists.
//      */

//     // FIX LATER, EMAIL IS MANUALLY SET, NEED TO GET FROM AUTH0 ============================+++
//     const email: string = 'testman@test.com';

//     const queryTextExists: string = 'SELECT 1 FROM profile WHERE email=$1';
//     client.query(queryTextExists, [email], (queryErr: any, queryRes: any) => {
//       // Error executing query
//       if (queryErr) {
//         res.status(500);
//         res.json({
//           status: "error",
//           message: "Could not check if user exists."
//         });
//         return next(queryErr);
//       }
//       // User profile already exists
//       if (queryRes.rows.length !== 0) {
//         res.status(403);
//         res.json({
//           status: 'error',
//           message: 'User profile already exists.'
//         });
//         done();
//       }
//       // User profile does not yet exist
//       else {
//         const queryText: string = 'INSERT INTO profile(email, first_name, \
//           last_name, bio, date_of_birth, location, looking_for_work, public, \
//           gender, skills, social_links, achievements, join_date) VALUES($1, \
//           $2, $3, $4, $5, $6, $7, $8, $9, $10);';
//         const queryValues = [
//           email,
//           req.body.data.firstName,
//           req.body.data.lastName,
//           req.body.data.bio,
//           req.body.data.DOB,
//           req.body.data.location,
//           req.body.data.lookingForWork.toString(),
//           req.body.data.public.toString(),
//           req.body.data.gender,
//           new Date()
//         ];
//       /**
//        * Query the database to add a new profile row with the information
//        * supplied by the user.
//        */
//         client.query(queryText, queryValues, (queryErr: any, queryRes: any) => {
//           // Error executing query
//           if (queryErr) {
//             res.status(500);
//             res.json({
//               status: "error",
//               message: "Could not create profile."
//             });
//             return next(queryErr);
//           }
//           console.log(`Profile created for email: ${req.body.data.email}`);
//           res.status(200);
//           res.json({
//             status: "success"
//           });
//           done();
//         });
//     });
//   });
// }