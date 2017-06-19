import React from 'react'
import {auth, githubProvider} from './base'
import './Signin.css'
// using destructur syntax here
const SignIn = ({ authHandler }) => {
    const authenticate = () => {
        auth.signInWithPopup(githubProvider).then((data)=>{
            authHandler(data.user)
        })}

    return(
        <button className="SignIn" onClick={authenticate}>Sign In</button>
    )

}

export default SignIn