import React, { Component } from 'react';
import './App.css';
import { BrowserRouter  as Router , Route } from 'react-router-dom';
import SIGNIN from './Components/Signin';
import SIGNUP from './Components/Signup';
import HOME from './Components/Pages/Home';
import PrivateRoute from "./PrivateRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={SIGNIN}/>
          <Route path="/signup" exact component={SIGNUP}/>
          <Route path="/home" exact component={HOME}/>
        </div>
      </Router>
    );
  }
}

export default App;
