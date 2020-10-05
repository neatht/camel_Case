import React from 'react';
import { Route } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { Spin } from 'antd';

type PrivateRouteProps = {
  component: React.ComponentType<object>;
};

const PrivateRoute = ({ component, ...args }: PrivateRouteProps) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Spin />,
    })}
    {...args}
  />
);

export default PrivateRoute;
