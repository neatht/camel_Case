import express from 'express';
import dotenv from 'dotenv';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import { addMediaService, checkProjectService, checkProfilePublicService, getMediaService } from './service';

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
    const isOwnProject = await checkProjectService(req.poolClient, req.body.userID, req.body.projectID, next);

    if (!isOwnProject) {
      return res.json({ success: false, error: 'Not own project'});
    }

    // get signed url
    const s3obj: any = await signS3(req.body.fileType);

    // get object url and add to db
    await addMediaService(req.poolClient, s3obj.url, s3obj.id, req.body.fileName, req.body.projectID, req.body.fileType,next);

    return res.json({
      status: 'success',
      data: {
        signedRequest: s3obj.signedRequest
      }
    });
  } catch (e) {
    console.log(e);
    return res.json({success: false, error: e});
  }

}

export const getMediaFromProject = async (req: any, res: express.Response, next: express.NextFunction) => {
  // check if profile belongs to user
  try {
    // check if it is the user's own project
    const ID = req.user.sub.split('|')[1];
    let isOwner;

    if (parseInt(ID, 0) === parseInt(req.body.userID, 0)) {
      isOwner = true;
    }
    const isOwnProject = await checkProjectService(req.poolClient, req.body.userID, req.body.projectID, next);
    const isPublic = await checkProfilePublicService(req.poolClient, req.body.userID, next);

    // if profile public or the user is the owner of the profile
    if ((isOwner && isOwnProject) || isPublic) {
      const results = await getMediaService(req.poolClient, req.body.projectID, next);

      return res.json({
        status: 'success',
        data: results
      })
    } else {
      return res.json({
        status: 'fail',
        error: 'profile is private'
      });
    }
  } catch (e) {
    console.log(e);
    return res.json({success: false, error: e});
  }
}