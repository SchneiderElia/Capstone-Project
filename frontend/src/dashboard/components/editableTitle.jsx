import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle} from "react"
import "../../App.css"

const EditableTitle = forwardRef (({ initialTitle = "Empty", onSaveTitle, }, ref) => {

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

      const startEditing = () => {
        setTitle(initialTitle);
        setIsEditing(true);
    };

    const handleStartEditing = (event) => {
        event.stopPropagation()
        event.preventDefault()
        setTitle(initialTitle)
        setIsEditing(true)
    }
    const handleStartEditingClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
        startEditing();
    };

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

    const stop = (event) => {
        event.stopPropagation()
        event.preventDefault()
    }

    useImperativeHandle(ref, () => ({
        triggerEdit: () => {
            startEditing();
        }
    }));

    return(
        <div>
            {isEditing ? (
            
                    <input
                    className="inputTitleBox"
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onClick={stop}
                    />
           
            ) : (
                <h5  className="text-white "onClick={handleStartEditingClick}
                style={{ cursor: "pointer"  }}
                title="Click to edit"
                >
                    {title}</h5>

            )}
        </div>
    )
})

export default EditableTitle