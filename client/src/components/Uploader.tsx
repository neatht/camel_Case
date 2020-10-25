import {
  FileImageOutlined,
  FilePdfOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Tooltip, Upload } from 'antd';
import React, { useRef, useState } from 'react';

import './Uploader.css';

type TextInputProps = {
  text?: string;
  padding?: string;
  radius?: string;
  editable?: boolean;
  multiline?: boolean;
  maxLen?: number;
  onChange?: Function;
};

function Uploader(props: TextInputProps) {
  const [text, setText] = useState<any>();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const displayTextRef = useRef<any>(null);

  return (
    <div
      style={{
        height: '500px',
        backgroundImage: `url(${text})`,
        backgroundSize: 'fit',
      }}
    >
      <img src={text} width="100px" height="100px"></img>
      <input
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
              setText(reader.result);
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
            <Upload>
              <div className="uploader-item">
                <VideoCameraOutlined />
              </div>
            </Upload>
          </Tooltip>
          <Tooltip title="Upload Image" placement="bottom">
            <div className="uploader-item">
              <FileImageOutlined />
            </div>
          </Tooltip>
          <Tooltip title="Upload PDF" placement="bottom">
            <div className="uploader-item">
              <FilePdfOutlined />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
