import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Home from './Home';
import TrackingHub from './TrackingHub';
import BudgetHub from './BudgetHub';
import ChooseBudget from './ChooseBudget';
import MailTest from './MailTest';

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
              <Route path="/budget" component={BudgetHub} />
              <Route path="/choosebudget" component={ChooseBudget} />
              <Route path="/tracking" component={TrackingHub} />
              <Route path="/mailtest" component={MailTest} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    </Router>
  );
};

export default App;
