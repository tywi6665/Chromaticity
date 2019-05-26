import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import Intro from "./pages/Intro";
import Main from "./pages/Main";
import Saved from "./pages/Saved";
import './App.css';

const App = () => (
  <Router>
    <div>
      <Route render={({ location }) => {
        const { pathname, key } = location;

        return (
          <TransitionGroup component={null}>
            <Transition
              key={key}
              appear={true}
              onEnter={(node, appears) => play(pathname, node, appears)}
              onExit={(node, appears) => exit(node, appears)}
              timeout={{ enter: 750, exit: 150 }}
            >
              <Switch location={location}>
                <Route exact path="/" component={Main} />
                <Route exact path="/main" component={Main} />
                <Route exact path="/saved" component={Saved} />
              </Switch>
            </Transition>
          </TransitionGroup>
        )
      }} />
    </div>
  </Router>
)

export default Intro(App);
// export default App;