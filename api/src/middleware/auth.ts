/**
 * This file contains middleware functions for authorization. Authentication is
 * handled by auth0.
 */

import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import express from 'express';

dotenv.config();

/**
 * jwtCheck() checks for a token in the Authorization header.
 *
 * Token must be in the form of:    Bearer <TOKEN>
 * An error is returned if the token is invalid or not present.
 * jwt() call from express-jwt library specifies 4 parameters:
 *    1) secret: uses jwks-rsa library to retrieve RSA signing key
 *    2) audience: specified in environment variable
 *    3) issuer: specified in environment variable
 *    4) algorithms: RSA-256
 */
export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI
}),
audience: process.env.AUTH0_AUDIENCE,
issuer: process.env.AUTH0_ISSUER,
algorithms: ['RS256']
});


/**
 * checkIsOwner() checks whether the user ID attached to req.user.sub after
 * calling jwtCheck() is the same as the user ID sent in the request body
 * (req.body.userID).
 *
 * @param req - the express Request object
 * @param res - the express Response object
 * @param next - the express NextFunction object
 */
export const checkIsOwner = (req: any, res: express.Response, next: express.NextFunction) => {
  // sub attribute in the format of "<social platform>|<user id>"
  const ID = req.user.sub.split('|')[1];

  if (parseInt(ID, 0) === parseInt(req.body.userID, 0)) {
    next();
  } else {
    res.sendStatus(401);
  }
}