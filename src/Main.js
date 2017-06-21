    import React from 'react';
import {Route, Switch} from 'react-router-dom'
import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import './Main.css'

const Main = (props) =>{
    return (
        <div className="Main">
        <Sidebar thisNote={props.thisNote} newNote={props.newNote} signOut={props.signOut} emptyNote={props.emptyNote} setEmptyNote={props.setEmptyNote}/>
        <NoteList notes={props.notes} openNote={props.openNote} setCurrentNoteId={props.setCurrentNoteId}/>
        <Switch>
            <Route path="/notes/:id" render={(navProps)=>(<NoteForm saveNote={props.saveNote} thisNote={props.thisNote} deleteNote={props.deleteNote} setEmptyNote={props.setEmptyNote} {...navProps}/>)}/>
            <Route path="/notes" render={(navProps)=>(<NoteForm saveNote={props.saveNote} thisNote={props.thisNote} deleteNote={props.deleteNote} setEmptyNote={props.setEmptyNote} {...navProps}/>)}/>
        </Switch>
        
        </div>
    )
}

export default Main