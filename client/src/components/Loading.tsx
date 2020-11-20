import React from 'react';
import { Spin } from 'antd';

import './Loading.css';

type LoadingProps = {
  /** Messages that will be shown to the user with spinners e.g. "Loading profile" */
  messages?: Array<string>;
  /** Whether to show the loading spinners or not */
  spinners?: boolean;
};

function Loading(props: LoadingProps) {
  // Spinners by default
  return (
    <div className="loading">
      {props.messages && props.messages.length > 0 ? (
        <div className="loading-items">
          {props.messages.map((message) => {
            return (
              <p>
                <h3>
                  <strong>
                    <span style={{ paddingRight: 5 }}>{message} </span>
                    {props.spinners === undefined ? (
                      <Spin />
                    ) : props.spinners ? (
                      <Spin />
                    ) : null}
                  </strong>
                </h3>
              </p>
            );
          })}
        </div>
      ) : (
        <Spin />
      )}
    </div>
  );
}

export default Loading;
