import React, { Component } from 'react';
import './App.css';
import Main from './Main'

class App extends Component {
  constructor(){
    super()
    this.state={
      notes:{
      },
      //Note: we have to make thisNote a templete while initiazing, otherwise, React will define it as blank object, which can't insert value directly
      thisNote:{
        id:null,
        title:'',
        body:''
      },
    }
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


  render() {
    return (
      <div className="App">
        <Main notes={this.state.notes} saveNote={this.saveNote} deleteNote={this.deleteNote} 
        openNote={this.openNote} thisNote={this.state.thisNote} newNote={this.newNote}/>
      </div>
    );
  }
}

export default App;
