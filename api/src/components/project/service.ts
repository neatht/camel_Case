import express from 'express';
import dotenv from 'dotenv';
import { service } from '../../helpers/service';

dotenv.config();

export const addMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'INSERT INTO media(date_posted, link, media_id, media_name, \
    project_id, media_type, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'

  const queryParams = [
    new Date(),
    req.body.s3ObjUrl,
    req.body.s3ObjID,
    req.body.mediaName,
    req.body.projectID,
    req.body.mediaType,
    req.body.userID
  ]

  await service(req.poolClient, next, query, queryParams);
}

export const updateMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = ['UPDATE media SET'];
  const queryParams = [];
  let varCount = 1;

  if (req.body.mediaName) {
    query.push(`media_name = $${varCount++}`);
    queryParams.push(req.body.mediaName);
  }

  if (req.body.datePosted) {
    query.push(`date_posted = $${varCount++}`);
    queryParams.push(req.body.datePosted);
  }

  query.push(`WHERE user_id = $${varCount++} AND project_id = $${varCount++} AND media_id = $${varCount};`);
  queryParams.push(req.body.userID, req.body.projectID, req.body.mediaID);

  await service(req.poolClient, next, query.join(' '), queryParams);
}

export const getMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'SELECT * FROM media WHERE project_id = $1 AND user_id = $2 AND media_id = $3;'

  const queryParams = [
    req.body.projectID,
    req.body.userID,
    req.body.mediaID
  ]

  const queryResults = await service(req.poolClient, next, query, queryParams);
  return queryResults.rows[0];
}

export const checkProfilePublicService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'SELECT public FROM profile WHERE user_id = $1;'
  const queryParams = [req.body.userID]
  const queryResults = await service(req.poolClient, next, query, queryParams);
  return queryResults.rows[0].public;
}

export const getProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT * FROM project WHERE project_id = $1 AND user_id = $2;';
  const queryParams: any[] = [req.body.projectID, req.body.userID]
  const queryResults: any = await service(req.poolClient, next, query, queryParams);

  return queryResults.rows[0];
}

export const addProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'INSERT INTO project(tags, location, project_name, link, user_id) VALUES \
    ($1, $2, $3, $4, $5);'
  const queryParams: any[] = [req.body.tags, req.body.location, req.body.projectName, req.body.link, req.body.userID]
  await service(req.poolClient, next, query, queryParams);
}

export const updateProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = ['UPDATE project SET'];
  const queryParams = [];
  let varCount = 1;

  if (req.body.projectName) {
    query.push(`project_name = $${varCount++}`);
    queryParams.push(req.body.projectName);
  }

  if (req.body.tags) {
    query.push(`tags = $${varCount++}`);
    queryParams.push(req.body.tags);
  }

  if (req.body.location) {
    query.push(`location = $${varCount++}`);
    queryParams.push(req.body.location);
  }

  if (req.body.link) {
    query.push(`link = $${varCount++}`);
    queryParams.push(req.body.link);
  }

  query.push(`WHERE user_id = ${varCount++} AND project_id = ${varCount};`);
  queryParams.push(req.body.userID, req.body.projectID);

  await service(req.poolClient, next, query.join(' '), queryParams);
}

export const upsertProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  // check if project and user id exists in table
  const checkQueryResults = await getProjectService(req, res, next);

  // does not exist yet, so insert
  if (Object.keys(checkQueryResults.rows[0]).length === 0 && Object.constructor === Object) {
    return await addProjectService(req, res, next);
  } else {
    return await updateProjectService(req, res, next);
  }
}

export const deleteProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'DELETE FROM project WHERE user_id = $1 AND project_id = $2;'
  const queryParams: any[] = [req.body.userID, req.body.projectID];
  await service(req.poolClient, next, query, queryParams);
}

export const deleteMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'DELETE FROM media WHERE user_id = $1 AND project_id = $2 AND media_id = $3;'
  const queryParams: any[] = [req.body.userID, req.body.projectID, req.body.mediaID];
  await service(req.poolClient, next, query, queryParams);
}