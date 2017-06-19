import React from 'react';
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'

const Main = (props) =>{
    return (
        <div className="Main">
        <Sidebar newNote={props.newNote}/>
        <NoteList notes={props.notes} openNote={props.openNote}/>
        <NoteForm saveNote={props.saveNote} thisNote={props.thisNote} deleteNote={props.deleteNote}/>
        </div>
    )
}

export default Main