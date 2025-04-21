import React from 'react'
import NoteCard from './noteCard'

const SideBarAllNoteView = ({ note = [], onDeleteNote, onSelectNote }) => {
    return(
        <div className="container d-flex flex-column  align-items-center bg-primary m-0 p-0 ms-3"
            style={{"height": "95vh", borderRadius: "0px", width: "160px"}}>
                <h5 className="text-white">Notes ({note.length})</h5>

                {note.length === 0 ? (
                    <p className='text-white'>No note saved yet</p>
                ):(
                    <div>
                        {note.map((note) => (
                            <NoteCard key={note._id} id={note._id} note={note} onDelete={onDeleteNote} onSelected={onSelectNote}/>
                        ))}
                    </div>
                )}
           
        </div>


    )
}

export default SideBarAllNoteView