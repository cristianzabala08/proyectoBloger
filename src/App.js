import React, { Component } from 'react';
import { Route } from 'react-router-dom';
//import Login from './components/Login';
import Register from './components/Register';
import Auth from './components/Auth';
import View from './components/View';
import './App.css';

 class App extends Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={View} />
        <Route path="/register" component={Register} />
        <Route path="/auth" component={Auth} />
      </div>
    );
  }
}

export default App; 


