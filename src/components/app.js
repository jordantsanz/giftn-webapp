import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Home';
import TrackingHub from './TrackingHub';

const App = (props) => {
  return (
    <Router>
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            timeout={300}
            classNames="fade"
          >
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route path="/budget" component={Home} />
              <Route path="/tracking" component={TrackingHub} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    </Router>
  );
};

export default App;
