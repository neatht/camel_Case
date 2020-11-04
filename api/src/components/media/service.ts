import express from 'express';
import dotenv from 'dotenv';
import { service } from '../../helpers/service';

dotenv.config();

export const addMediaService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query = 'INSERT INTO media(date_posted, link, media_id, media_name, \
    media_type) VALUES ($1, $2, $3, $4, $5);'

  const queryParams = [
    new Date(),
    req.body.data.link,
    req.body.data.mediaID,
    req.body.data.mediaName,
    req.body.data.mediaCategory
  ]

  await service(req, next, query, queryParams);
}

export const addDisplayPhotoService = async (req: any, next: express.NextFunction) => {
  const query = 'INSERT INTO display_photo(user_id, media_id) \
   VALUES ($1, $2);'

  const queryParams = [
    req.body.data.userID,
    req.body.data.mediaID
  ]

  await service(req, next, query, queryParams);
}

export const getDisplayPhotoService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query =
    'SELECT m.date_posted AS "datePosted", m.link, \
      m.media_type AS "mediaType", dp.media_id AS "mediaID", \
      dp.user_id AS "userID" \
    FROM media m \
    INNER JOIN display_photo dp ON m.media_id = dp.media_id \
    WHERE dp.user_id = $1;'

  const queryParams = [
    req.params.userID
  ]

  const queryResults = await service(req, next, query, queryParams);
  return queryResults.rows[0];
}


export const deleteDisplayPhotoService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string =
    'DELETE \
    FROM media m \
    USING display_photo dp \
    WHERE m.media_id = dp.media_id AND \
          dp.user_id = $1;'

  const queryParams: any[] = [req.body.data.userID];
  await service(req, next, query, queryParams);
}

export const addHeroImageService = async (req: any, next: express.NextFunction) => {
  const query = 'INSERT INTO hero_image (user_id, media_id) \
   VALUES ($1, $2);'

  const queryParams = [
    req.body.data.userID,
    req.body.data.mediaID
  ]

  await service(req, next, query, queryParams);
}

export const getHeroImageService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query =
    'SELECT m.date_posted AS "datePosted", m.link, \
      m.media_type AS "mediaType", hi.media_id AS "mediaID", \
      hi.user_id AS "userID" \
    FROM media m \
    INNER JOIN hero_image hi ON m.media_id = hi.media_id \
    WHERE hi.user_id = $1;'

  const queryParams = [
    req.params.userID
  ]

  const queryResults = await service(req, next, query, queryParams);
  return queryResults.rows[0];
}


export const deleteHeroImageService = async (req: any, res: express.Response, next: express.NextFunction) => {
  const query: string =
    'DELETE \
    FROM media m \
    USING hero_image hi \
    WHERE m.media_id = hi.media_id AND \
          hi.user_id = $1;'

  const queryParams: any[] = [req.body.data.userID];
  await service(req, next, query, queryParams);
}