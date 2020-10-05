import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/theme.css";
import "./css/base.css";
import "./css/layout.css";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/profile-setup" exact component={ProfileSetup} />
      </Switch>
    </Router>
  );
}

export default App;
