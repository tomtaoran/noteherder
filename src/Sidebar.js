import React from 'react'
import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './Sidebar.css'

const Sidebar= (props)=>{
  function createNote(ev) {
    const note = {
      id: null,
      title: '',
      body: '',
    }
    props.newNote(note)
  }


 return (
    <nav className="Sidebar">
        <div className="logo">
          <img src={quill} alt="Noteherder" />
        </div>
        <button className="new-note" onClick={createNote}>
          <img src={newHover} alt="New note" />
          <img className="outline" src={newIcon} alt="New note" />
        </button>
      </nav>
 )
}


export default Sidebar