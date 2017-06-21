import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import SignInWithGit from './SigninWithGit'
import SignInWithGoogle from './SigninWithGoogle'

class SignIn extends Component {
 render(){
     return(
         <div>
         <SignInWithGit/>
         <SignInWithGoogle />
         </div>
     )
 }
}

export default SignIn