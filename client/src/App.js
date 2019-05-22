import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Intro from "./pages/Intro";
import Main from "./pages/Main";
import Saved from "./pages/Saved";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/saved" component={Saved} />
      </Switch>
    </div>
  </Router>
)

export default Intro(App);
