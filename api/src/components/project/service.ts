import express from 'express';
import dotenv from 'dotenv';
import { service } from '../../helpers/service';

dotenv.config();

export const addMediaService = async (poolClient: any, link: string, mediaID: string, mediaName: string,
                                      projectID: number, userID: number, mediaType: string, next: express.NextFunction) => {
  const query = 'INSERT INTO media(date_posted, link, media_id, media_name, \
    project_id, media_type, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'

  const queryParams = [
    new Date(),
    link,
    mediaID,
    mediaName,
    projectID,
    mediaType,
    userID
  ]

  await service(poolClient, next, query, queryParams);
}

export const getMediaService = async (poolClient: any, projectID: number, userID: number, next: express.NextFunction) => {
  const query = 'SELECT * FROM media WHERE project_id = $1 AND user_id = $2;'

  const queryParams = [
    projectID,
    userID
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

export const getProjectService = async (poolClient: any, userID: string, projectID: number, next: express.NextFunction) => {
  const query: string = 'SELECT * FROM project WHERE project_id = $1 AND user_id = $2;';
  const queryParams: any[] = [projectID, userID]
  const queryResults: any = await service(poolClient, next, query, queryParams);

  return queryResults.rows[0];
}

export const addProjectService = async (poolClient: any, userID: string,  projectName: string, tags: string[], location: string, link: string, next: express.NextFunction) => {
  const query: string = 'INSERT INTO project(tags, location, project_name, link, user_id) VALUES \
    ($1, $2, $3, $4, $5);'
  const queryParams: any[] = [tags, location, projectName, link, userID]
  await service(poolClient, next, query, queryParams);
}