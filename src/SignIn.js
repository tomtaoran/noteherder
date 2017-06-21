import React, { Component } from 'react';
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