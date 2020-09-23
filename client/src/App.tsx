import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import 'antd/dist/antd.css';

import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </Router>
  );
}

export default App;
