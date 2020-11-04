import express from 'express';
import dotenv from 'dotenv';
import aws from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

import {
  addMediaService,
  addProjectService,
  getProjectMediaService,
  getProjectService,
  updateProjectService,
  getAllProjectsByUserService,
  updateProjectMediaService,
  deleteProjectService,
  deleteProjectMediaService,
  addProjectMediaService
} from './service';

import { checkProfileService, checkPublicService } from '../../helpers/service';

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


export const addMediaToProject = async (req: any, res: express.Response, next: express.NextFunction) => {
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
    await addMediaService(req, res, next);
    await addProjectMediaService(req, next);

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

export const getMediaFromOwnProject = async (req: any, res: express.Response, next: express.NextFunction) => {
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
    const result = await getProjectMediaService(req, res, next);

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

export const updateMediaFromOwnProject = async (req: any, res: express.Response, next: express.NextFunction) => {
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
    await updateProjectMediaService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}

export const getMediaFromProject = async (req: any, res: express.Response, next: express.NextFunction) => {
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

    const isPublic = await checkPublicService(req, next, userID);
    if (isPublic) {
      const results = await getProjectMediaService(req, res, next);

      req.poolClient.release();
      res.status(200);
      return res.json({
        status: 'success',
        data: results
      });
    } else {
      req.poolClient.release();
      res.status(401);
      return res.json({
        status: 'error',
        message: 'profile is private'
      });
    }
  } catch (e) {
    next(e);
  }
}

export const getProjectById = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.params.userID;
    const profileExists = await checkProfileService(req, next, userID);

    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist'
      })
    }

    const isPublic = await checkPublicService(req, next, userID);

    if (isPublic) {
      const results = await getProjectService(req, res, next);

      req.poolClient.release();
      res.status(200);
      return res.json({
        status: 'success',
        data: results
      });
    } else {

      req.poolClient.release();
      res.status(401);
      return res.json({
        status: 'error',
        message: 'profile is private'
      });
    }
  } catch (e) {
    next(e);
  }
}

export const getAllProjectsByUser = async (req: any, res: express.Response, next: express.NextFunction) => {
  try {
    const userID = req.params.userID;
    const profileExists = await checkProfileService(req, next, userID);

    if (!profileExists) {
      req.poolClient.release();
      res.status(404);
      return res.json({
        status: 'error',
        message: 'Profile does not exist'
      })
    }

    const isPublic = await checkPublicService(req, next, userID);

    if (isPublic) {
      const results = await getAllProjectsByUserService(req, res, next);

      req.poolClient.release();
      res.status(200);
      return res.json({
        status: 'success',
        data: results
      });
    } else {

      req.poolClient.release();
      res.status(401);
      return res.json({
        status: 'error',
        error: 'Profile is private'
      });
    }
  } catch (e) {
    next(e);
  }
}

export const getAllOwnProjects = async (req: any, res: express.Response, next: express.NextFunction) => {
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

    req.params.userID = userID;
    const results = await getAllProjectsByUserService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success',
      data: results
    });
  } catch (e) {
    next(e);
  }
}

export const getOwnProjectById = async (req: any, res: express.Response, next: express.NextFunction) => {
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

    req.params.userID = userID;
    const results = await getProjectService(req, res, next);

    req.poolClient.release();
    res.status(200);
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

    req.body.data.userID = userID;
    await addProjectService(req, res, next);

    req.poolClient.release();
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

    req.body.data.userID = userID;
    await updateProjectService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}

// export const upsertProject = async (req: any, res: express.Response, next: express.NextFunction) => {
//   try {
//     req.body.data.userID = req.user.sub.split('|')[1];
//     await upsertProjectService(req, res, next);
//     res.status(200);
//     return res.json({
//       status: 'success'
//     });
//   } catch (e) {
//     next(e);
//   }
// }

export const deleteProject = async (req: any, res: express.Response, next: express.NextFunction) => {
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

    req.body.data.userID = userID;
    await deleteProjectService(req, res, next);

    req.poolClient.release();
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

    req.body.data.userID = userID;
    await deleteProjectMediaService(req, res, next);

    req.poolClient.release();
    res.status(200);
    return res.json({
      status: 'success'
    });
  } catch (e) {
    next(e);
  }
}