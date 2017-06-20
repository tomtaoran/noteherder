import React from 'react'
import {auth, googleProvider} from './base'
import './Signin.css'
// using destructur syntax here
const SignInWithGoogle = () => {
    const authenticate = () => {
        auth.signInWithPopup(googleProvider)
    }

    return(
        <button className="SignIn" onClick={authenticate}>Sign In With Google</button>
    )

}

export default SignInWithGoogle