import React, { Component } from 'react';
import './NoteForm.css'

class NoteForm extends Component{
    constructor(props){
        //NOTE: If you have props, remember, constructor have to take the props
        super(props)

        this.state= {
            note:this.blankNote(),

        }
    }

    blankNote= ()=>{
        return {
            id: null,
            title: '',
            body:'',
        }
    }

    handleChanges= (ev)=>{
       // console.log(ev.target.value)
       const note = {...this.state.note}
       note[ev.target.name]=ev.target.value
       this.setState({note}, ()=>{this.props.saveNote(this.state.note)}) //callback value have to be a functoin
    }
    
    handleSubmit = (ev)=>{
        ev.preventDefault()
        this.setState({note: this.blankNote()})
    }

    render(){
        return (
            <div className="NoteForm">
            <form onSubmit={this.handleSubmit}>
            <p>
                <input type="text" name="title" placeholder="Title your note" onChange={this.handleChanges} value={this.state.note.title}/>
              </p>
              <p>
                <textarea name="body" placeholder="Just start typing..." onChange={this.handleChanges} value={this.state.note.body}></textarea>
              </p>
              <button type="submit">Save and New</button>
            </form>
            </div>
        )
    }
}

export default NoteForm