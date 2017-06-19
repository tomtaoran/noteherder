import React from 'react'
import './Signout.css'
const SignOut = ({ signOut }) =>{
    return <button className="SignOut" id= "SignOut" onClick={signOut}> Sign Out</button>
}

export default SignOut