import React, { Component } from 'react';
import './NoteForm.css'
import RichTextEditor from 'react-rte'

class NoteForm extends Component{
    state = {
        value: RichTextEditor.createEmptyValue()
    }
    // constructor(props){
    //     //NOTE: If you have props, remember, constructor have to take the props
    //     super(props)

    //     this.state= {
    //         note: (props.thisNote === null ? this.blankNote() : props.thisNote),
    //     }
    // }

    componentWillReceiveProps(nextProps){
        const newId = nextProps.match.params.id
        if (newId) {
            if (newId !== this.props.thisNote.id) {
                const note = nextProps.notes[newId]
                if (note) {
                this.props.setCurrentNote(note)
                this.setState({ value: RichTextEditor.createValueFromString(nextProps.thisNote.body, 'html')})
                } else if (Object.keys(nextProps.notes).length > 0) {
            
            this.props.history.push('/notes')
            //This part tells us if we manually submit a wired notes
        }else{
            if (this.props.thisNote.id) {
            //debugger
            this.setState({ value: RichTextEditor.createEmptyValue() })
      this.props.resetCurrentNote()
      //This is for creating new note and if statement detectes for loading (at that point, this.props can be Object Empty)
    }
        } 
            
            }
        } 
    }
    /*A Super Confusing One, I don't know why You have to do those logics if the only thing
    you need to do is to "reRender" when new posts exists and should be shown
        componentWillReceiveProps(nextProps){
        const newId = nextProps.match.params.id
        if (newId) {
        if (newId !== this.props.thisNote.id) {
            const note = nextProps.notes[newId]
            if (note) {
            this.props.setCurrentNote(note)
            } else if (Object.keys(nextProps.notes).length > 0) {
            this.props.history.push('/notes')
            }
        }
    } else if (this.props.thisNote.id) {
      this.props.resetCurrentNote()
    }

        }*/


    blankNote= ()=>{
        return {
            id: null,
            title: '',
            body:'',
        }
    }

    handleChanges= (ev)=>{
       // console.log(ev.target.value)
       const note = {...this.props.thisNote}
       note[ev.target.name]=ev.target.value
       this.props.saveNote(note)
       if(this.props.thisNote.title===''){
            this.props.setEmptyNote(false)
       }
       //this.setState({note}, ()=>{this.props.saveNote(this.state.note)}) //callback value have to be a functoin
       
    }

  handleBodyChanges = (value) => {
        const note = {...this.props.thisNote}
        //console.log("before change:"+note.body)
        this.setState({ value })
        note.body = value.toString('html');
        //console.log("after change:" +note.body)
        this.props.saveNote(note)
    }




    handleDelete= (ev)=>{
       // console.log(ev.target.value)
       this.props.deleteNote(this.props.thisNote)
       //this.setState({note: this.blankNote()})
    }
    
    render(){
        // As a backup method: <button type="submit">Save and New</button>
        // here is what I am talking about: if we are an empty object, there is no definition on this.state.note.title and it is uncontrolled initially then...
        return (
            <div className="NoteForm">
            <form>
            <p>
                <input type="text" name="title" placeholder="Title your note" onChange={this.handleChanges} value={this.props.thisNote.title}/>
              </p>

              {/*<p>
                <textarea name="body" placeholder="Just start typing..." onChange={this.handleChanges} value={this.props.thisNote.body}></textarea>
              </p>*/}
              <RichTextEditor 
                                className="body"
                                value={this.state.value} 
                                onChange={this.handleBodyChanges} 
                                placeholder="Just start typing..."
                            />


              <button type="button" onClick={this.handleDelete}><i className="fa fa-trash-o"></i></button>
            </form>
            </div>
        )
    }
}

export default NoteForm