import React from 'react';
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'

const Main = (props) =>{
    return (
        <div className="Main">
        <Sidebar thisNote={props.thisNote} newNote={props.newNote} signOut={props.signOut} emptyNote={props.emptyNote} setEmptyNote={props.setEmptyNote}/>
        <NoteList notes={props.notes} openNote={props.openNote} setCurrentNoteId={props.setCurrentNoteId}/>
        <NoteForm saveNote={props.saveNote} thisNote={props.thisNote} deleteNote={props.deleteNote} setEmptyNote={props.setEmptyNote}/>
        </div>
    )
}

export default Main