import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const DotsControl = ({onDelete, onSaveTitle, onEdit}) => {

    const [isClick, setIsClick] = useState(false)

    const handleClick = (event) => {
        event.preventDefault()
        
        setIsClick(!isClick)
    }

    const handleDelete = (event) => {
        event.preventDefault();
        if (onDelete) {
            onDelete(event);
        }
        setIsClick(false);
    }

    const handleEdit = (event) => {
        event.preventDefault();
        event.stopPropagation(); 
        if (onEdit) {
            onEdit(); 
        }
        setIsClick(false)
    };

    return(
    <div className='d-flex flex-column align-items-center gap-3'>
        {isClick && (
            <div style={{position:"relative", zIndex:"20", gap:"10px", display:"flex", flexDirection:"column"}}>
                <Icon icon="line-md:edit" width="27" height="27"  style={{color: "white"}} onClick={handleEdit}/>
                <Icon icon="line-md:trash" width="27" height="27" style={{ color: "white", cursor: "pointer" }} onClick={handleDelete} />
            </div>
        )}
        <Icon icon="pepicons-pop:dots-y" width="40" height="40" style={{ color: "white", cursor: "pointer" }} onClick={handleClick} />
        
    </div>
    )
}

export default DotsControl;
