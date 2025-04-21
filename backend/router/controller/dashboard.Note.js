import Note from "../../database/model/note.js"


export const getNotes = async (request, response, next) => {

    console.log("Executing getNote handler")

    const containerId = request.params.id
    const userId = request.user._id
    console.log(`Executing request note for ${containerId} and user ${userId}`)

    try{
       const notes = await Note.find({
        container: containerId,
        user: userId
       })
       .sort({ createdAt: -1 });
       console.log(`Found ${notes.length} notes in container ${containerId}`);
       response.status(200).json(notes);

    }catch(error){
        console.log('Error notes not found', error)
        next(error)
    }
}