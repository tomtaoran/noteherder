import React, { Component } from 'react';
import './NoteForm.css'

class NoteForm extends Component{
    constructor(props){
        //NOTE: If you have props, remember, constructor have to take the props
        super(props)

        this.state= {
            note: (props.thisNote === null ? this.blankNote() : props.thisNote),
        }
    }

    componentWillReceiveProps = (newProps) => {
        if (this.props.thisNote.id !== newProps.thisNote.id) {
            this.setState({ note: newProps.thisNote === null ? this.blankNote() : newProps.thisNote })
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
       if(this.state.note.title===''){
            this.props.setEmptyNote(false)
       }
       this.setState({note}, ()=>{this.props.saveNote(this.state.note)}) //callback value have to be a functoin
       
    }

    handleDelete= (ev)=>{
       // console.log(ev.target.value)
       this.props.deleteNote(this.state.note)
       this.setState({note: this.blankNote()})
    }
    
    handleSubmit = (ev)=>{
        ev.preventDefault()
        this.setState({note: this.blankNote()})
    }

    render(){
        // As a backup method: <button type="submit">Save and New</button>
        // here is what I am talking about: if we are an empty object, there is no definition on this.state.note.title and it is uncontrolled initially then...
        return (
            <div className="NoteForm">
            <form onSubmit={this.handleSubmit}>
            <p>
                <input type="text" name="title" placeholder="Title your note" onChange={this.handleChanges} value={this.state.note.title}/>
              </p>
              <p>
                <textarea name="body" placeholder="Just start typing..." onChange={this.handleChanges} value={this.state.note.body}></textarea>
              </p>
              
              <button onClick={this.handleDelete}><i className="fa fa-trash-o"></i></button>
            </form>
            </div>
        )
    }
}

export default NoteForm