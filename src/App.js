import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import base, {auth} from './base'
import SignIn from './Signin'
import SignOut from './SignOut'

class App extends Component {
  constructor(){
    super()
    this.state={
      notes:{
      },
      uid: null,
      currentNoteId:null,
      emptyNote:false,
      //Note: we have to make thisNote a templete while initiazing, otherwise, React will define it as blank object, which can't insert value directly
      thisNote:{
        id:null,
        title:'',
        body:''
      },
    }
  }

  componentWillMount(){
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler(user)
        }else{
          this.setState({uid: null, notes: {}})
        }
      }
    )
  }

  syncNotes = () => {
    this.ref= base.syncState(
      `${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes',
      }
    )
  }


  signedIn= ()=> {
    return this.state.uid
  }

  signOut = () =>{
    auth.signOut()
    .then(()=>{
      base.removeBinding(this.ref)
      //Stop syncing with Firebase
    })
  }

  authHandler = (userData) => {
    this.setState(
      { uid: userData.uid },
      this.syncNotes
    )
  }


  saveNote = (note)=>{
    if(!note.id){
      note.id=`note-${Date.now()}`
    }
    //alert(note.title)
    const notes = {...this.state.notes} //Although doable, but it is not standard since it is object not array
    notes[note.id]=note
    this.setState({notes})
  }

  newNote= (note)=>{
    if(!note.id){
      note.id=`note-${Date.now()}`
    }
    //alert(this.state.thisNote.title.value)
    const notes = {...this.state.notes} //Although doable, but it is not standard since it is object not array
    notes[note.id]=note
    this.setState({notes},()=>{this.openNote(note)})
    
  }

  deleteNote=(note)=>{
    const notes = {...this.state.notes} //Although doable, but it is not standard since it is object not array
    // This is NON-Firebase version: delete notes[note.id] 
    notes[note.id]= null
    this.setState({notes})
  }

  openNote=(note)=>{
    this.setState({ thisNote: note })
  }

  setCurrentNoteId = (noteId) =>{
    this.setState({currentNoteId: noteId})
  }

  renderMain= () => {
      const actions = {
        saveNote: this.saveNote,
        deleteNote: this.deleteNote,
        setCurrentNoteId: this.setCurrentNoteId,
      }
      return (<div>
      <Main notes={this.state.notes} {...actions} 
        openNote={this.openNote} thisNote={this.state.thisNote} 
        newNote={this.newNote} signOut={this.signOut}
        emptyNote={this.state.emptyNote} setEmptyNote={this.setEmptyNote}/>
        </div>)
  }

  setEmptyNote = (bool) =>{
    this.setState({emptyNote: bool})
  }

  render() {
    return (
      <div className="App">
        {this.signedIn() ? this.renderMain() : <SignIn />}
      </div>
    );
  }
}

export default App;
