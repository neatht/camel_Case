import { Request, Response, } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const EXPIRATION_MINUTES: number = 1;
const EXPIRATION_SECONDS: number = 60 * EXPIRATION_MINUTES;

/**
 * authLogin() returns the success status of logging in, along with a token if successful
 *
 * @param { Request } req - The request object
 * @param { Response } res - The response object
 */
export const authLogin = (req: Request, res: Response) => {
  // validate email/password
  const email = req.body.username;
  const password = req.body.password;

  // if successful, create JWT
  const payload = { userID: '123' };
  const token = generateAccessToken(payload);
  res.json({
    status: 'success',
    data: {
      token
    }
  });

  // if unsuccessful, send error response


}

/**
 * generateAccessToken() returns a newly signed JWT
 *
 * @param { { string } } payload - payload object containing userID property as a string
 */
const generateAccessToken = (payload: { userID: string }) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: EXPIRATION_SECONDS });
}