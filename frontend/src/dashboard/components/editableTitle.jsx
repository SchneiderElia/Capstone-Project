import React, { useEffect, useState, useRef } from "react"

const EditableTitle = ({ initialTitle = "Empty", onSaveTitle, })=> {

    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(initialTitle)
    const inputRef = useRef(null)
    
    useEffect(()=>{
        if(!isEditing){
        setTitle(initialTitle)
        }
    },[initialTitle,isEditing])


    useEffect(() => {
        if (isEditing && inputRef.current) {
          inputRef.current.focus()
          inputRef.current.select()
        }
      }, [isEditing]);

    const handleStartEditing = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setTitle(initialTitle)
        setIsEditing(true)
    }

    const handleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleBlur = () => {
        setIsEditing(false)
        if(onSaveTitle && title !== initialTitle){
            console.log(`EditableTitle: Call onSaveTitle con "${title}"`)
            onSaveTitle(title)
        }

    }

    const handleKeyDown = (event) => {
        if(event.key === "Enter"){
            event.preventDefault()
            inputRef.current.blur()
        }else if(event.key === "Escape"){
            event.preventDefault()
            setTitle(initialTitle)
            setIsEditing(false)
        }

    }

    

    return(
        <div>
            {isEditing ? (
            
                    <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    />
           
            ) : (
                <h5  className="text-white"onClick={handleStartEditing}
                style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = '#00000'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                title="Click to edit"
                >
                    {title}</h5>

            )}
        </div>
    )
}

export default EditableTitle