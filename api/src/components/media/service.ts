import express from 'express';
import dotenv from 'dotenv';
import { service } from '../../helpers/service';

dotenv.config();

export const addMediaService = async (poolClient: any, link: string, mediaID: string, mediaName: string,
                                      projectID: number, mediaType: string, next: express.NextFunction) => {
  const query = 'INSERT INTO media(date_posted, link, media_id, media_name, \
    project_id, media_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;'

  const queryParams = [
    new Date(),
    link,
    mediaID,
    mediaName,
    projectID,
    mediaType
  ]

  await service(poolClient, next, query, queryParams);
}

export const getMediaService = async (poolClient: any, projectID: number, next: express.NextFunction) => {
  const query = 'SELECT * FROM media WHERE project_id = $1;'

  const queryParams = [
    projectID,
  ]

  const queryResults = await service(poolClient, next, query, queryParams);
  return queryResults.rows[0];
}

export const checkProfilePublicService = async (poolClient: any, userID: number, next: express.NextFunction) => {
  const query = 'SELECT public FROM profile WHERE user_id = $1;'
  const queryParams = [userID]
  const queryResults = await service(poolClient, next, query, queryParams);
  return queryResults.rows[0].public;
}

export const checkProjectService = async (poolClient: any, userID: string, projectID: number, next: express.NextFunction) => {
  const query: string = 'SELECT user_id FROM project WHERE project_id = $1;';
  const queryParams: any[] = [projectID]
  const queryResult: any = await service(poolClient, next, query, queryParams);

  // only one row should be returned since project ID is unique
  if (parseInt(queryResult.rows[0].user_id, 0) === parseInt(userID, 0)) {
    return true;
  } else{
    return false;
  }
}