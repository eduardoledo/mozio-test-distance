import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as screens from './screens';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={"/"} component={screens.MainForm} />
          <Route path={"/:from,:to"} component={screens.MainForm} />
          <Route path={"/results/:from,:to"} component={screens.Results} />
        </Switch>
      </Router>
    );
  }
}

export default App;
