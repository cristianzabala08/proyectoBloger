import React, { Component } from 'react';
import Login from '../components/Login';
import Bloger from '../components/Bloger'
import fire from '../config/fire';


class Auth extends Component {

    constructor(props) {
      super(props);
      this.state = {
        user: null,
        email:''
      };
  
      this.authListener = this.authListener.bind(this);
    }
  
    componentDidMount() {
      this.authListener();
    }
  
    authListener() {
      fire.auth().onAuthStateChanged((user) => {   
        //console.log(this.state.email);
        if (user) {
          this.setState({ user , email:(user.providerData[0].email)});
         
        } else {
          this.setState({ user: null });
        }
      })
    }
    render() {
      return (
        <div className="container">
          { this.state.user ? ( <Bloger email= {this.state.email}/> ) : ( <Login /> ) }
        </div>
      );
    }
  }
  
  export default Auth;