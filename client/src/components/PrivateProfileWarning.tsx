import React from 'react';
import { Button, Result } from 'antd';
import { useHistory } from 'react-router-dom';

import './PrivateProfileWarning.css';

function PrivateProfileWarning() {
  let history = useHistory();
  return (
    <div className="private-profile-warning">
      <Result
        status="warning"
        title="This profile is set to private"
        extra={
          <Button type="primary" onClick={() => history.goBack()}>
            Go Back
          </Button>
        }
      />
    </div>
  );
}

export default PrivateProfileWarning;
