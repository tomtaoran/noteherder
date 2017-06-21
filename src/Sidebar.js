import React from 'react'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './Sidebar.css'
import SignOut from './SignOut'
import {Link} from 'react-router-dom'

const Sidebar= (props)=>{
  function createNote(ev) {
    props.resetCurrentNote()
    if(props.emptyNote===true){
      return
    }
    
    props.setEmptyNote(true)
  }


 return (
    <nav className="Sidebar">
      <SignOut signOut={props.signOut}/>
        <div className="logo">
          <img src={quill} alt="Noteherder" />
        </div>
       <Link to="/notes" className="new-note">
        <button className="new-note" onClick={createNote}>
          <img src={newHover} alt="New note" />
          <img className="outline" src={newIcon} alt="New note" />
        </button>
        </Link>
      </nav>
 )
}


export default Sidebar