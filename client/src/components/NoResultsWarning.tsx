import React from 'react';
import { Result } from 'antd';

import './NoResultsWarning.css';

function NoResultsWarning() {
  return (
    <div className="no-results-warning">
      <Result status="warning" title="No results found" />
    </div>
  );
}

export default NoResultsWarning;
