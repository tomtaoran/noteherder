import React, { Component } from 'react';
import './App.css';
import Main from './Main'

class App extends Component {
  constructor(){
    super()
    this.state={
      notes:{
      },
      thisNote:{},
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
        <Main notes={this.state.notes} saveNote={this.saveNote} deleteNote={this.deleteNote} openNote={this.openNote} thisNote={this.state.thisNote}/>
      </div>
    );
  }
}

export default App;
