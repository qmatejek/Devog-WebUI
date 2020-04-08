import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { NoMatch } from './NoMatch';
import {NavBar} from './components/NavBar'
import { Login } from './Login';
import { Video } from './components/Video';
import './CSS/styles.css';

function App() {
  return (
    <React.Fragment>
      <NavBar/>
        <Router>
          <Switch>
            <Route exact path="/" component = {Home}/>
            <Route path="/login" component = {Login}/>
            <Route path="/video" component = {Video}/>
            <Route component = {NoMatch}/>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
