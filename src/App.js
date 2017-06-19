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
        }
      }
    )
  }

  syncNotes = () => {
    base.syncState(
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
    
    auth.signOut().then(this.setState({uid: null}))
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
    const notes = {...this.state.notes} //Although doable, but it is not standard since it is object not array
    notes[note.id]=note
    this.setState({notes})
  }

  newNote= (note)=>{
    if(!note.id){
      note.id=`note-${Date.now()}`
    }
    const notes = {...this.state.notes} //Although doable, but it is not standard since it is object not array
    notes[note.id]=note
    this.setState({notes},()=>{this.openNote(note)})
    
  }

  deleteNote=(note)=>{
    const notes = {...this.state.notes} //Although doable, but it is not standard since it is object not array
    delete notes[note.id] 
    this.setState({notes})
  }

  openNote=(note)=>{
    this.setState({ thisNote: note })
  }

  renderMain= () => {

      return (<div>
        <SignOut signOut={this.signOut}/>
      <Main notes={this.state.notes} saveNote={this.saveNote} deleteNote={this.deleteNote} 
        openNote={this.openNote} thisNote={this.state.thisNote} newNote={this.newNote}/>
        </div>)
  }

  render() {
    return (
      <div className="App">
        {this.signedIn() ? this.renderMain() : <SignIn authHandler={this.authHandler}/>}
      </div>
    );
  }
}

export default App;
