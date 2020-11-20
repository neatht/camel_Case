/**
 * This file contains error handling middleware for Express.
 */
import express from 'express';

export const errorHandler = (err: Error, req: any,
                             res: express.Response,
                             next: express.NextFunction) => {
  if (req.poolClient) {
    req.poolClient.release();
  }
  console.error(err.message);
  res.status(500);
  res.json({
    status: 'error',
    message: err.message
  });
}