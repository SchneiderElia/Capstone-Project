import Recat, {useState, useEffect} from "react"
import './takeNoteArea.css'

const TakeNoteArea = ({ initialValue = '', onTextChange }) => {

    const [text, setText] = useState(initialValue);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setText(newValue)


        if (onTextChange) {
            onTextChange(newValue);
        }
    };

    useEffect(() => {
        setText(initialValue);
    }, [initialValue]);

    
    return(
        <textarea className="noteArea" placeholder="Write Here!" value={text}
        onChange={handleChange}>

        </textarea>
    )
}
export default TakeNoteArea
