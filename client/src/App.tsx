import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './css/theme.css';
import './css/base.css';
import './css/layout.css';

import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfileSetup from './pages/ProfileSetup';
import APITest from './pages/APITest';
import Tests from './pages/Tests';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile/:userID?" exact component={Profile} />
        <Route path="/profile-setup/:userID?" component={ProfileSetup} />
        <Route path="/api-test" exact component={APITest} />
        <PrivateRoute path="/tests" exact component={Tests} />
      </Switch>
    </Router>
  );
}

export default App;
