import React, { Component } from 'react';
import SignInWithGit from './SigninWithGit'
import SignInWithGoogle from './SigninWithGoogle'
import './Signin.css'
class SignIn extends Component {
 render(){
     return(
         <div className="SignInButtons">
         <SignInWithGit/>
         <SignInWithGoogle />
         </div>
     )
 }
}

export default SignIn