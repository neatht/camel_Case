import {
  FileImageOutlined,
  FilePdfOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import React, { useRef, useState } from 'react';

import './Uploader.css';

type TextInputProps = {
  onUpload: Function;
};

function Uploader(props: TextInputProps) {
  const [type, setType] = useState<string>('');
  // const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  // const displayTextRef = useRef<any>(null);

  return (
    <div>
      {/* <embed src={text} width="100px" height="100px" /> */}
      {/* <img src={text} width="100px" height="100px"></img> */}
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        onChange={() => {
          // inputRef.current.files[0].name;
          const file = inputRef.current.files[0];
          console.log(file);
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              // convert image file to base64 string
              console.log(reader.result?.toString());
              const fileType = file.type ? file.type : file.name.split('.')[1];
              props.onUpload(reader.result, fileType, type);
            },
            false
          );

          if (file) {
            reader.readAsDataURL(file);
          }
        }}
        type="file"
        id="input"
      />
      <div className="uploader">
        +
        <div className="uploader-inner">
          <Tooltip title="Upload Film" placement="bottom">
            <div
              onClick={() => {
                inputRef.current.click();
                setType('video');
              }}
              className="uploader-item"
            >
              <VideoCameraOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Upload Image" placement="bottom">
            <div
              onClick={() => {
                inputRef.current.click();
                setType('image');
              }}
              className="uploader-item"
            >
              <FileImageOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Upload PDF" placement="bottom">
            <div
              onClick={() => {
                inputRef.current.click();
                setType('pdf');
              }}
              className="uploader-item"
            >
              <FilePdfOutlined />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
