import express from 'express';
import { pool } from '../config/postgres';

/**
 * connectPool() connects to the pg pool.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const connectPool = (req: any, res: express.Response,
                            next: express.NextFunction) => {
  pool.connect((connectErr: any, client: any, done: any) => {
    /**
     * Return an status 500 error message if server is unable to connect with
     * the database.
     */
    if (connectErr) {
      next(new Error('Error connecting to database'));
    } else {
      req.poolClient = client;
      next();
    }
  });
}

/**
 * getID() gets an authenticated user's user_id from the profile database
 * table, and adds it to the request object (req.userID). Must be called after
 * a database connection has been made.
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const getID = async (req: any,
                            res: express.Response,
                            next: express.NextFunction) => {
  const query: string = 'SELECT user_id FROM profile WHERE email = $1';
  const queryParams = [req.user[process.env.EMAIL_KEY]];
  try {
    const result: any = await req.poolClient.query(query, queryParams);
    if (result.rowCount === 0 || !result.rowCount) {
      throw new Error('User does not have a profile.');
    } else {
      const userID = result.rows[0].user_id;
      req.userID = userID;
      next();
    }
  } catch (err) {
    next(err);
  }
}