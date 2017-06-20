import React from 'react'
import './Note.css'
const Note=(props)=>{
     function openNote(ev){
    const li = ev.target.closest('li')
    const thisNote = {
      id: li.childNodes[0].childNodes[0].textContent,
      title: li.childNodes[0].childNodes[1].textContent,
      body: li.childNodes[0].childNodes[2].textContent,
    }
    props.openThisNote(thisNote)

    }
    return (<a onClick={() => props.setCurrentNoteId(props.note.id)}>
            <li onClick={openNote}>
            <div className="note">
              <div className="note-id invisible">{props.note.id}</div>
              <div className="note-title">
                {props.note.title}
              </div>
              <div className="note-body">
                <p>
                  {props.note.body}
                </p>
              </div>
            </div>
          </li>
          </a>)
}

export default Note