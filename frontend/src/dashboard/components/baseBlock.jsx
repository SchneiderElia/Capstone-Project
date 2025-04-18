import React from "react"
import { Link } from "react-router-dom"

const BaseBlock =  ({ id, index }) => {

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

    return(
        <Link to={boxPath} style={{ ...baseStyle, ...sizeStyle }}>
        <div>
            Blocco #{id} ({isLarge ? 'Largo 60%' : 'Piccolo 35%'})
        </div>
        </Link>

)}

export default BaseBlock
