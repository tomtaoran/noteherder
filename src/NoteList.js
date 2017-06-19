import React from 'react'
import Note from './Note'
import './NoteList.css'

const NoteList = (props)=>{
 return (<div className="NoteList">
        <h3>Notes</h3>
        <ul id="notes">
        {Object.keys(props.notes).map((noteId)=>{
          return <Note note={props.notes[noteId]} key={noteId} openThisNote={props.openNote}/>
        })}
          {/*<li>
              <div className="note">
                <div className="note-title">Preserve and cherish that pale blue dot </div>
                <div className="note-body">
                  <p>
                    network of wormholes a billion trillion the only home we've ever known light years dream of the mind's eye. Intelligent beings!
                  </p>
                </div>
              </div>
            </li>

            <li>
              <div className="note">
                <div className="note-title">Laws of physics</div>
                <div className="note-body">
                  <p>
                    Cambrian explosion radio telescope, circumnavigated citizens of distant epochs brain is the seed of intelligence two ghostly white figures in coveralls and helmets are soflty dancing galaxies inconspicuous motes of rock and gas
                  </p>
                </div>
              </div>
            </li>*/}
          
        </ul>
      </div>)
}

export default NoteList