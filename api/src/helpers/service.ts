/**
 * This file includes helper functions for writing service functions inside
 * api components.
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
export const service = async (req: any,
                              next: express.NextFunction,
                              query: string,
                              queryParams: any[]) => {
  try {
    return await req.poolClient.query(query, queryParams);
  } catch(err) {
    next(err);
  }
}