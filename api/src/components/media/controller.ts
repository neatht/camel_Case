import express from 'express';
import dotenv from 'dotenv';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

import {
  addMediaService,
  getDisplayPhotoService,
  deleteDisplayPhotoService,
  addDisplayPhotoService,
  addHeroImageService,
  deleteHeroImageService,
  getHeroImageService
} from './service';

import { checkProfileService } from '../../helpers/service';

dotenv.config();

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  signatureVersion: 'v4',
  region: 'ap-southeast-2'
});

const uploadS3 = (file: string, fileType: string) => {
  return new Promise( (resolve, reject) => {
    const s3 = new aws.S3();
    const key = uuidv4();
    const fileDetails = file.split(',');
    const base64String = fileDetails[1];
    const buffer = Buffer.from(base64String, 'base64');

    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      ACL: 'public-read',
      Body: buffer,
      ContentType: fileType
    }

    s3.upload(s3Params, (err: any, data: any) => {
      if (err) {
        throw new Error(err);
      }

      const returnData = {
        url: data.Location,
        id: key
      }

      resolve(returnData);
    });
  })
}

export const addDisplayPhoto = async (req: any, res: express.Response, next: express.NextFunction) => {
  // check if profile belongs to user
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }
    req.body.data.userID = userID;

    const response: any = await uploadS3(req.body.data.file, req.body.data.fileType);
    req.body.data.link = response.url;
    req.body.data.mediaID = response.id;

    // get object url and add to db
    await deleteDisplayPhotoService(req, res, next);
    await addMediaService(req, res, next);
    await addDisplayPhotoService(req, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: {
        response
      }
    });
  } catch (e) {
    next(e);
  }
}



export const getOwnDisplayPhoto = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }

    req.params.userID = userID;
    const result = await getDisplayPhotoService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export const getDisplayPhotoById = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.params.userID;
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }

    const result = await getDisplayPhotoService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export const deleteDisplayPhoto = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);

    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist'
      })
    }

    req.body.data = { userID };
    await deleteDisplayPhotoService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}

export const addHeroImage = async (req: any, res: express.Response, next: express.NextFunction) => {
  // check if profile belongs to user
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }
    req.body.data.userID = userID;

    const response: any = await uploadS3(req.body.data.file, req.body.data.fileType);
    req.body.data.link = response.url;
    req.body.data.mediaID = response.id;

    // get object url and add to db
    await deleteHeroImageService(req, res, next);
    await addMediaService(req, res, next);
    await addHeroImageService(req, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: {
        response
      }
    });
  } catch (e) {
    next(e);
  }
}

export const getOwnHeroImage = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }

    req.params.userID = userID;
    const result = await getHeroImageService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export const getHeroImageById = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.params.userID;
    const profileExists = await checkProfileService(req, next, userID);
    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist.'
      });
    }

    const result = await getHeroImageService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export const deleteHeroImage = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.user.sub.split('|')[1];
    const profileExists = await checkProfileService(req, next, userID);

    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist'
      })
    }

    req.body.data = { userID };
    await deleteHeroImageService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}