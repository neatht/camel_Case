/**
 * This file contains middleware functions for authorization. Authentication is
 * handled by auth0.
 */

import dotenv from 'dotenv';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

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