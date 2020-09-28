import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './css/theme.css';
import './css/base.css';
import './css/layout.css';


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
