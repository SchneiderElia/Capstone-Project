import Note from "../../database/model/note.js"

export const createNote = async(request, response, next) => {

    const containerId = request.params.id
    const userId = request.user._id
    const { textContent, title } = request.body
    console.log('Executing createNote handler in to container', containerId)

    try{
        const noteData = {
            user: userId,
            container: containerId,
            title: title || 'Untitled Note',
            textContent: textContent || ''
    
        }
        const newNote = await Note.create(noteData)
        console.log(`New newNote created successfully: ${newNote}`)
        response.status(201).send(newNote)

    }catch(error){
        console.log(`Error newNote not created:`, error)
        next(error)
    }
}


export const updateNote = async(request, response, next) => {
    const noteId = request.params.id
    const userId = request.user._id
    const { title, textContent } = request.body
    console.log('Executing updateNote handler')

    const updateFile = {}
    if(title !== undefined){
        if(typeof title === "string"){
            updateFile.title = title.trim()
        }
    }else{
        return response.status(400).send('Missing title field')
    }

    if(textContent !== undefined){
        if(typeof textContent === "string"){
            updateFile.textContent = textContent
        }
    }else{
        return response.status(400).send('Missing textContent field')
    }
    
    if (Object.keys(updateFields).length === 0) {
        console.log(`Update note ${noteId} failed: No valid fields provided.`);
        return response.status(400).send('No valid fields provided for update.');
    }
    console.log(`Attempting to update note ${noteId} with:`, updateFields);

    try{
        const updatedNote = await Note.findOneAndUpdate(
            { _id: noteId, user: userId },
            {  $set: updateFields },
            { new: true }
        )
        if(!updatedNote){
            console.log(`Upload failed: Note not found`)
            return response.status(404).send('Note not found')
        }
        console.log(`Note updated successfully: ${updatedNote}`)
        response.status(200).send(updatedNote)

    }catch(error){
        console.log(`Error note not updated:`, error)
        next(error)
    }
    
}

export const deleteNote = async(request, response, next) => {

    const noteId = request.params.id
    const userId = request.user._id
    console.log('Executing deleteNote handler')

    try{
        const deletedNote = await Note.findOneAndDelete({ _id: noteId, user: userId })
        if(!deletedNote){
            const error = new Error("Note not found")
            error.statusCode = 404
            return next(error)
        }
        console.log(`Note deleted successfully: ${deletedNote}`)
        response.status(204).send()

    }catch(error){
        console.log(`Error note not deleted:`, error)
        next(error)
    }
}