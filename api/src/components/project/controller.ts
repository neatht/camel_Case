import express from 'express';
import dotenv from 'dotenv';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import {
  addMediaService,
  addProjectService,
  checkProfilePublicService,
  getMediaService,
  getProjectService,
  updateProjectService,
  upsertProjectService,
  updateMediaService,
  deleteProjectService,
  deleteMediaService
} from './service';

dotenv.config();

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  signatureVersion: 'v4',
  region: 'ap-southeast-2'
});

const signS3 = (fileType: string) => {
  return new Promise( (resolve, reject) => {
    const s3 = new aws.S3();
    const key = uuidv4();
    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 500,
      ContentType: fileType,
      ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3Params, (err: any, data: any) => {
      if (err) {
        throw new Error(err);
      }

      const returnData = {
        signedRequest: data,
        url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`,
        id: key
      }

      resolve(returnData);
    });
  })
}


export const addMediaToProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  // check if profile belongs to user
  try {
    req.body.userID = req.user.sub.split('|')[1];

    // get signed url
    const s3obj: any = await signS3(req.body.fileType);
    req.body.s3ObjUrl = s3obj.url;
    req.body.s3ObjID = s3obj.id;

    // get object url and add to db
    await addMediaService(req, res, next);

    res.status(200);
    return res.json({
      status: 'success',
      data: {
        signedRequest: s3obj.signedRequest
      }
    });
  } catch (e) {
    next(e);
  }
}

export const getMediaFromOwnProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    const results = await getMediaService(req, res, next);

    return res.json({
      status: 'success',
      data: results
    });
  } catch (e) {
    next(e);
  }
}

export const updateMediaFromOwnProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    const results = await updateMediaService(req, res, next);

    return res.json({
      status: 'success',
      data: results
    });
  } catch (e) {
    next(e);
  }
}

export const getMediaFromProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const isPublic = await checkProfilePublicService(req, res, next);
    if (isPublic) {
      const results = await getMediaService(req, res, next);

      return res.json({
        status: 'success',
        data: results
      });
    } else {
      return res.json({
        status: 'fail',
        error: 'profile is private'
      });
    }
  } catch (e) {
    next(e);
  }
}

export const getProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const isPublic = await checkProfilePublicService(req, res, next);
    if (isPublic) {
      const results = await getProjectService(req, res, next);

      return res.json({
        status: 'success',
        data: results
      });
    } else {
      return res.json({
        status: 'fail',
        error: 'profile is private'
      });
    }
  } catch (e) {
    next(e);
  }
}

export const getOwnProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    const results = await getProjectService(req, res, next);

    return res.json({
      status: 'success',
      data: results
    });
  } catch (e) {
    next(e);
  }
}

export const addProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    await addProjectService(req, res, next);

    res.status(200);
    return res.json({
      status: 'success',
    });
  } catch (e) {
    next(e);
  }
}

export const updateProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    await updateProjectService(req, res, next);

    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}

export const upsertProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    await upsertProjectService(req, res, next);
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}

export const deleteProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    await deleteProjectService(req, res, next);
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}

export const deleteMedia = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    req.body.userID = req.user.sub.split('|')[1];
    await deleteMediaService(req, res, next);
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}