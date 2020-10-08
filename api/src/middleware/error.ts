/**
 * This file contains error handling middleware for Express.
 */
import express from 'express';

export const errorHandler = (err: Error, req: express.Request,
                             res: express.Response,
                             next: express.NextFunction) => {
  res.status(500);
  res.json({
    status: 'error',
    message: 'Something went wrong on our end. :('
  });
  console.log(err.message);
}