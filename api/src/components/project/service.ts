import express from 'express';
import dotenv from 'dotenv';
import { service } from '../../helpers/service';

dotenv.config();

export const addMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'INSERT INTO media(date_posted, link, media_id, media_name, \
    project_id, media_type, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'

  const queryParams = [
    new Date(),
    req.body.data.s3ObjUrl,
    req.body.data.s3ObjID,
    req.body.data.mediaName,
    req.body.data.projectID,
    req.body.data.fileType,
    req.body.data.userID
  ]

  await service(req, next, query, queryParams);
}

export const updateMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = ['UPDATE media SET'];
  const queryParams = [];
  let varCount = 1;

  if (req.body.data.mediaName) {
    query.push(`media_name = $${varCount++}`);
    queryParams.push(req.body.data.mediaName);
  }

  if (req.body.data.datePosted) {
    query.push(`date_posted = $${varCount++}`);
    queryParams.push(req.body.data.datePosted);
  }

  query.push(`WHERE user_id = $${varCount++} AND project_id = $${varCount++} AND media_id = $${varCount};`);
  queryParams.push(req.body.data.userID, req.body.data.projectID, req.body.data.mediaID);

  await service(req, next, query.join(' '), queryParams);
}

export const getMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'SELECT date_posted AS "datePosted", link, media_name AS "mediaName", \
    project_id AS "projectID", media_type AS "mediaType", media_id AS "mediaID", \
    user_id AS "userID"FROM media WHERE project_id = $1 AND user_id = $2;'

  const queryParams = [
    req.params.projectID,
    req.params.userID
  ]

  const queryResults = await service(req, next, query, queryParams);
  return queryResults.rows;
}

export const getProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT project_id AS "projectID", tags, views, date_posted AS "datePosted", \
    location, project_name AS "projectName", link, user_id AS "userID", project_type AS "projectType" FROM project \
    WHERE project_id = $1 AND user_id = $2;';
  const queryParams: any[] = [req.params.projectID, req.params.userID]
  const queryResults: any = await service(req, next, query, queryParams);

  return queryResults.rows[0];
}

export const getAllProjectsByUserService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'SELECT project_id AS "projectID", tags, views, date_posted AS "datePosted", \
    location, project_name AS "projectName", link, user_id AS "userID", project_type AS "projectType" FROM project \
    WHERE user_id = $1;';

  const queryParams: any[] = [req.params.userID]
  const queryResults: any = await service(req, next, query, queryParams);

  return queryResults.rows;
}

export const addProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'INSERT INTO project(date_posted, tags, location, project_name, link, user_id, project_type) VALUES \
    ($1, $2, $3, $4, $5, $6, $7);'

  let tags = [];

  if (req.body.data.tags != null) {
    tags = req.body.data.tags;
  }

  const queryParams: any[] = [
    new Date(),
    tags,
    req.body.data.location,
    req.body.data.projectName,
    req.body.data.link,
    req.body.data.userID,
    req.body.data.projectType
  ]
  await service(req, next, query, queryParams);
}

export const updateProjectService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = ['UPDATE project SET'];
  const queryParams = [];
  let varCount = 1;

  console.log('updateProjectService');

  if (req.body.data.projectName) {
    query.push(`project_name = $${varCount++},`);
    queryParams.push(req.body.data.projectName);
  }

  if (req.body.data.tags) {
    query.push(`tags = $${varCount++},`);
    queryParams.push(req.body.data.tags);
  }

  if (req.body.data.location) {
    query.push(`location = $${varCount++},`);
    queryParams.push(req.body.data.location);
  }

  if (req.body.data.link) {
    query.push(`link = $${varCount++},`);
    queryParams.push(req.body.data.link);
  }

  if (req.body.data.projectType) {
    query.push(`project_type = $${varCount++},`);
    queryParams.push(req.body.data.projectType);
  }

  const lastIndex = query.length - 1;
  query[lastIndex] = query[lastIndex].substring(0, query[lastIndex].length - 1);

  query.push(`WHERE user_id = $${varCount++} AND project_id = $${varCount};`);
  queryParams.push(req.body.data.userID, req.body.data.projectID);

  console.log(query.join(' '));
  console.log(queryParams);
  await service(req, next, query.join(' '), queryParams);
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
  const queryParams: any[] = [req.body.data.userID, req.body.data.projectID];
  await service(req, next, query, queryParams);
}

export const deleteMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string = 'DELETE FROM media WHERE user_id = $1 AND project_id = $2 AND media_id = $3;'
  const queryParams: any[] = [req.body.data.userID, req.body.data.projectID, req.body.data.mediaID];
  await service(req, next, query, queryParams);
}