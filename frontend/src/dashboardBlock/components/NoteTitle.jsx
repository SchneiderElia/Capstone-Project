import React, {useState} from "react"


const NoteTitle = () => {

    const text = ""

    const [noteTitle, setNoteTitle] = useState('')
    const [isFocus, setIsFocus] = useState(false)
    
    const hendleclick = (event) => {
        setIsFocus(true)
        setNoteTitle(event.target.value)
    }   

    return(
        <h3 onClick={hendleclick} value={text} className="text-white">hello</h3>
    )
}

export default NoteTitle