/**
 * This file contains error handling middleware for Express.
 */
import express from 'express';

export const errorHandler = (err: Error, req: express.Request,
                             res: express.Response,
                             next: express.NextFunction) => {
  console.error(err.message);
  res.status(500);
  res.json({
    status: 'error',
    message: 'Something went wrong on our end. :('
  });
}