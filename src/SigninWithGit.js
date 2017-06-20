import React from 'react'
import {auth, githubProvider} from './base'
import './Signin.css'
// using destructur syntax here
const SignInWithGit = () => {
    const authenticate = () => {
        auth.signInWithPopup(githubProvider)
    }

    return(
        <button className="SignIn" onClick={authenticate}>Sign In With GitHub</button>
    )

}

export default SignInWithGit