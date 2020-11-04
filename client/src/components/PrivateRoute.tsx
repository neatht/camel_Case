import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import Loading from './Loading';

type PrivateRouteProps = RouteProps & {
  component: React.ComponentType<object>;
};

const PrivateRoute = ({ component, ...args }: PrivateRouteProps) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

export default PrivateRoute;
