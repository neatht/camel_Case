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