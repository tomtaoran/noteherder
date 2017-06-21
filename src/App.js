import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Main from './Main'
import base, {auth} from './base'
import SignIn from './SignIn'
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
    this.getUserFromLocalStorage()
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

  getUserFromLocalStorage(){
    const uid= localStorage.getItem('uid')
    if(!uid){
      return
    }
    this.setState({uid})
  }

  syncNotes = () => {
    this.ref= base.syncState(
      `notes/${this.state.uid}`,
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
      this.stopSyncing()
      //base.removeBinding(this.ref)
      //Stop syncing with Firebase
      this.setState({uid: null, notes: {}, thisNote:{
        id:null,
        title:'',
        body:''
      }})
    })
  }

  authHandler = (userData) => {
    localStorage.setItem('uid',userData.uid)
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

  stopSyncing = ()=>{
    if(this.ref){
      base.removeBinding(this.ref)
    }
  }

  renderMain= () => {
      const actions = {
        saveNote: this.saveNote,
        deleteNote: this.deleteNote,
        setCurrentNoteId: this.setCurrentNoteId,
      }
      return (
      <Main notes={this.state.notes} {...actions} 
        openNote={this.openNote} thisNote={this.state.thisNote} 
        newNote={this.newNote} signOut={this.signOut}
        emptyNote={this.state.emptyNote} setEmptyNote={this.setEmptyNote}/>)
  }

  setEmptyNote = (bool) =>{
    this.setState({emptyNote: bool})
  }

  render() {
     const actions = {
        saveNote: this.saveNote,
        deleteNote: this.deleteNote,
        setCurrentNoteId: this.setCurrentNoteId,
      }

    return (
      <div className="App">
        <Switch>
          <Route path="/notes" render={()=>
            this.signedIn() ?
            <Main notes={this.state.notes} {...actions} 
        openNote={this.openNote} thisNote={this.state.thisNote} 
        newNote={this.newNote} signOut={this.signOut}
        emptyNote={this.state.emptyNote} setEmptyNote={this.setEmptyNote}/>
        : <Redirect to="/sign-in" />
           }/>
        <Route path="/sign-in" render={()=>(
          !this.signedIn() ? <SignIn /> : <Redirect to="/notes" />
        )
        }/>
         <Route render={()=><Redirect to="/notes" />} />
        </Switch>
        
        {/*{this.signedIn() ? this.renderMain() : <SignInWithGit />}
        {this.signedIn() ? this.renderMain() : <SignInWithGoogle />}*/}
         {/*<Route path="/sign-in" component={SignInWithGit} />
         <Route path="/sign-in" component={SignInWithGoogle} />*/}
      </div>
    );
  }
}

export default App;
