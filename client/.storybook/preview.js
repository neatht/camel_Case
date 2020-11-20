import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
//import { Auth0Context } from '@auth0/auth0-react';

export const decorators = [
  (Story) => <BrowserRouter> <Story /> </BrowserRouter>
]

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewMode: 'docs'
}
