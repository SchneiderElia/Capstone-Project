import React from "react"
import Button from "react-bootstrap/esm/Button"
import { Icon } from "@iconify/react"
import "./noteCard.css"

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
        <div className="noteCard d-flex justify-content-between align-items-center" onClick={() => onSelected(note)}>
            <div className="d-flex flex-column gap-1">
            <h6 className="mt-2" style={{fontSize: "17px", fontWeight: "bold", color: "white"}}> {note.title || `Nota ${note._id.slice(-4)}`}</h6>
            <p style={{fontSize: "16px", fontWeight:"normal"}}> {note.textContent?.substring(0, 20)}...</p>
            </div>
            <div className="d-flex flex-column gap-2 align-items-center">
            <Icon icon="weui:delete-on-filled" width="27" height="27"  style={{color:" #cf0606"}} onClick={handleDeleteClick} />
            <Icon icon="lucide:edit" width="20" height="20"  style={{color:"white"}} />

            </div>

        </div>
    )
}

export default NoteCard