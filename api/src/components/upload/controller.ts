import express from 'express';
import dotenv from 'dotenv';
import aws from 'aws-sdk';

dotenv.config();

aws.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  signatureVersion: 'v4',
  region: 'ap-southeast-2'
});

export const signS3 = (req: express.Request, res: express.Response,
  next: express.NextFunction) => {
    const s3 = new aws.S3();
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;

    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Expires: 500,
      ContentType: fileType
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.log(err);
        res.json({success: false, error: err, message: 'putObject failed'});
      }

      // const returnData = {
      //   signedRequest: data,
      //   url: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
      // }

      // console.log(returnData);
      res.json({success: true, data: {signedRequest: data}});
    });
}