import React from "react"
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import EditableTitle from "./editableTitle"

const BaseBlock =  ({ id, index, onDelete, onTitleUpdate, title }) => {

    console.log(`BaseBlock ID: ${id} - Received title prop:`, title)
    const isLarge = (index % 4 === 0 || index % 4 === 3)

    const baseStyle = {
        border: '1px solid cyan',
        borderRadius: '8px',
        padding: '15px',
        height: '380px', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
    }

    

    const sizeStyle = {
        flexGrow: 0,
         flexShrink: 0,
            flexBasis: isLarge ? '60%' : '35%',
        backgroundColor: isLarge ? 'rgba(0, 150, 150, 0.2)' : 'rgba(150, 0, 150, 0.2)', // Colori diversi
    }

    const boxPath = `/dashboard/block/${id}`

    const handleDeleteClick = (event) => {
        event.preventDefault()
        if(onDelete){
            console.log(`Block ID request to delete: ${id}`)
            onDelete(id)
        }else{
            console.log('Prpo do not pass to handleDeleteBlock')
        }
    }

    const handleSaveTitle = (newTitleFromInput) => {
       
        console.log(`BaseBlock: Recived new title "${newTitleFromInput}" t0 ID ${id}`)
        if(onTitleUpdate){
            onTitleUpdate(id, newTitleFromInput)
        }else{
            console.log("Title not updated skip saving")
        }
    }
        
    return(
       
        <Link to={boxPath} style={{ ...baseStyle, ...sizeStyle }}>
        <div>
            <EditableTitle initialTitle={title} onSaveTitle={handleSaveTitle}/>
            Blocco #{id} ({isLarge ? 'Largo 60%' : 'Piccolo 35%'})
            <Button variant="primary" onClick={handleDeleteClick}>delete</Button>
        </div>
        
        </Link>


)}

export default BaseBlock
