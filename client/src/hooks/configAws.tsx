import AWS from 'aws-sdk';
import React, { useEffect, useRef } from 'react';

export default function useConfigAws() {
  useEffect(() => {
    AWS.config.update({
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
    });
  }, []);

  return AWS;
}