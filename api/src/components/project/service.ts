import express from 'express';
import dotenv from 'dotenv';
import { service } from '../../helpers/service';

dotenv.config();

export const addMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'INSERT INTO media(date_posted, link, media_id, media_name, \
    media_type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;'

  const queryParams = [
    new Date(),
    req.body.data.link,
    req.body.data.mediaID,
    req.body.data.mediaName,
    req.body.data.mediaCategory
  ]

  await service(req, next, query, queryParams);
}

export const addProjectMediaService = async(req: any, next: express.NextFunction) => {
  const query = 'INSERT INTO project_media (project_id, media_id, user_id) \
    VALUES ($1, $2, $3);'

  const queryParams = [
    req.body.data.projectID,
    req.body.data.mediaID,
    req.body.data.userID
  ]

  await service(req, next, query, queryParams);
}

export const updateMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = ['UPDATE media m SET'];
  const queryParams = [];
  let varCount = 1;

  if (req.body.data.mediaName) {
    query.push(`m.media_name = $${varCount++},`);
    queryParams.push(req.body.data.mediaName);
  }

  if (req.body.data.datePosted) {
    query.push(`m.date_posted = $${varCount++},`);
    queryParams.push(req.body.data.datePosted);
  }

  const lastIndex = query.length - 1;
  query[lastIndex] = query[lastIndex].substring(0, query[lastIndex].length - 1);

  query.push(`FROM project_media pm`)
  query.push(`WHERE pm.media_id = m.media_id AND pm.user_id = $${varCount++} AND pm.project_id = $${varCount++} AND pm.media_id = $${varCount};`);
  queryParams.push(req.body.data.userID, req.body.data.projectID, req.body.data.mediaID);

  await service(req, next, query.join(' '), queryParams);
}

export const getMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query =
    'SELECT m.date_posted AS "datePosted", m.link, m.media_name AS "mediaName", \
      pm.project_id AS "projectID", m.media_type AS "mediaType", pm.media_id AS "mediaID", \
      pm.user_id AS "userID" \
    FROM media m \
    INNER JOIN project_media pm ON m.media_id = pm.media_id \
    WHERE pm.project_id = $1 AND pm.user_id = $2;'

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
  const query: string =
    'DELETE \
    FROM media m \
    USING project_media pm \
    WHERE m.media_id = pm.media_id AND \
          pm.user_id = $1 AND \
          pm.project_id = $2 AND \
          pm.media_id = $3;'

  const queryParams: any[] = [req.body.data.userID, req.body.data.projectID, req.body.data.mediaID];
  await service(req, next, query, queryParams);
}