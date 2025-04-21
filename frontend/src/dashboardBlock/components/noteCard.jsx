import React from "react"
import Button from "react-bootstrap/esm/Button";

const NoteCard = ({note, onDelete, id, onSelected}) => {

    const handleDeleteClick = (event) => {
        event.preventDefault()
        if(onDelete){
            console.log(`Note ID request to delete: ${id}`)
            onDelete(id)
        }else{
            console.log('Prpo do not pass to handleDeletNote')
        }
    }

    return(
        <div onClick={() => onSelected(note)}> 
            <p> Mod: {new Date(note.updatedAt).toLocaleDateString()} {new Date(note.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <h6> {note.title || `Nota ${note._id.slice(-4)}`}</h6>
            <p> {note.textContent?.substring(0, 70)}...</p>
            <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
            <Button variant="primary">Edit</Button>

        </div>
    )
}

export default NoteCard