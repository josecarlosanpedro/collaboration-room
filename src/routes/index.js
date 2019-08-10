import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Classroom from '../modules/Classroom';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Classroom} exact />
      </Switch>
    );
  }
}

export default Routes;
