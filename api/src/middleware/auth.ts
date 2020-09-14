import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * authenticateAccessToken() verifies the JSON web token
 * Expects the token sent in Authorization header in the form:
 *
 *    Authorization: Bearer <token>
 *
 * @param { Request } req - The request object
 * @param { Response } res - The response object
 * @param { NextFunction } res - The next object
 */
export const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (authHeader === null) {
    return res.json({
      status: 'error',
      message: 'An access token was not sent.'
    });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.json({
        status: 'error',
        message: 'An invalid access token was sent.'
      });
    }
    next();
  });
}

