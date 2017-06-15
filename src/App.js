import React, { Component } from 'react';
import './App.css';
import Main from './Main'

class App extends Component {
  constructor(){
    super()
    this.state={
      notes:{
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

  render() {
    return (
      <div className="App">
        <Main notes={this.state.notes} saveNote={this.saveNote}/>
      </div>
    );
  }
}

export default App;
