/**
 * This file includes helper functions for writing service functions inside
 * api components and also service functions that are useful across different
 * components.
 */

import express from 'express';

/**
 * service() sends the provided query with queryParams and returns the result
 * of the query.
 *
 * @param req - express Request
 * @param next - express NextFunction
 * @param query - a string representing the query
 * @param queryParams - an array of query parameters
 */

export const service = async (poolClient: any,
                              next: express.NextFunction,
                              query: string,
                              queryParams: any[]) => {
  try {
    return await poolClient.query(query, queryParams);
  } catch(err) {
    next(err);
  }
}

/**
 * checkProfileService() checks if a profile with userID exists.
 *
 * @param req - express Request
 * @param next - express NextFunction
 * @param userID - string to match against user_id database field
 *
 * @returns true if profile exists, false if it does not exist
 */
export const checkProfileService = async (req: any, next: express.NextFunction, userID: string) : Promise<boolean> => {
  const query = 'SELECT EXISTS(SELECT 1 FROM profile WHERE user_id=$1)';
  const queryParams = [userID];
  const queryResult = await service(req, next, query, queryParams);
  return queryResult.rows[0].exists;
}

/**
 * checkPublicService() checks if the profile with userID is public.
 *
 * @param req - express Request
 * @param next - express NextFunction
 * @param userID - string to match against user_id database field
 *
 * @returns true if profile is public, false if it is private
 */
export const checkPublicService = async (req: any, next: express.NextFunction, userID: string) : Promise<boolean> => {
  const query = 'SELECT public FROM profile WHERE user_id=$1;';
  const queryParams = [userID];
  const queryResult = await service(req, next, query, queryParams);
  if (queryResult.rowCount === 0) {
    next(new Error(`Error executing checkPublicService() because no profile found for userID: ${userID}`));
  } else {
    return queryResult.rows[0].public;
  }
}
