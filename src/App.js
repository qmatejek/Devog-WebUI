import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { NoMatch } from './NoMatch';
import {NavBar} from './components/NavBar'
import { Layout } from './components/Layout';
import { Login } from './Login';
import { Upload } from './Upload';
import { LoginTest } from './LoginTest';
import { VideoTest } from './components/VideoTest';
import { Logout } from './components/Logout';
import './CSS/styles.css';

function App() {
  return (
    <React.Fragment>
      {/* <LoginTest/> */}
      <NavBar/>
      <Logout/>
      {/* <Layout> */}
        <Router>
          <Switch>
            <Route exact path="/" component = {Home}/>
            <Route path="/login" component = {Login}/>
            <Route path="/upload" component = {Upload}/>
            <Route path="/video" component = {VideoTest}/>
            <Route component = {NoMatch}/>
          </Switch>
        </Router>
      {/* </Layout> */}
    </React.Fragment>
  );
}

export default App;
