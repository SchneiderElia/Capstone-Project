import React from 'react'
import NoteCard from './noteCard'
import "./sideBarNoteSave.css"

const SideBarAllNoteView = ({ note = [], onDeleteNote, onSelectNote }) => {
    return(
        <div>
        <p className="text-white"style={{fontSize:"12px"}}>Notes ({note.length})</p>
        <div className="container d-flex flex-column  m-0 p-3 ms-3 sideBarNoteSave">
                

                {note.length === 0 ? (
                    <p className='text-white' style={{fontSize:"12px"}}>No note saved yet</p>
                ):(
                    <div>
                        {note.map((note) => (
                            <NoteCard key={note._id} id={note._id} note={note} onDelete={onDeleteNote} onSelected={onSelectNote}/>
                        ))}
                    </div>
                )}
           
        </div>
        </div>


    )
}

export default SideBarAllNoteView