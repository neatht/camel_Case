import { useEffect, useRef } from 'react';
import useAwsConfig from './configAws';

export default function useAwss3() {
  const AWS = useAwsConfig();
  const s3 = useRef(new AWS.S3());

  useEffect(() => {
    s3.current = new AWS.S3();
  }, []);

  return s3.current;
}
