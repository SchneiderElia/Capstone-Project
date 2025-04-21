import DashboardBlock from "../../database/model/dashboar.Block.js"
import Note from "../../database/model/note.js"    


export const getSingleBlock = async (request, response, next) => {
    const { id: blockId } = request.params; // ID blocco dall'URL
    const userId = request.user._id;      // ID utente da middleware

    console.log(`Executing getSingleBlock handler for ID: ${blockId} by user ${userId}`);

    try {
        // Trova il blocco per ID E utente
        const block = await DashboardBlock.findOne({
            _id: blockId,
            user: userId
        });
        // Nota: Non serve .populate() qui a meno che tu non voglia dati utente specifici

        // Se non trovato o non appartiene all'utente
        if (!block) {
            console.log(`getSingleBlock: Block not found or user not authorized. ID: ${blockId}, User: ${userId}`);
            return response.status(404).json({ message: 'Block not found or user not authorized.' });
        }

        // Se trovato, invia i dettagli del blocco
        console.log(`Block ${block._id} found.`);
        response.status(200).json(block); // Invia l'oggetto blocco come JSON

    } catch (error) {
        console.error(`Error fetching single block ${blockId}:`, error);
        next(error); // Passa errore al gestore
    }
};



export const createBlock = async (request, response, next) => {

    console.log("Executing creatBlock hendler")

    try{
        const userId = request.user._id
        const titleBlock = request.body.title

        const lastBlock = await DashboardBlock.findOne({ user: userId }).sort({ order: -1 })
        const newOrder = lastBlock ? lastBlock.order + 1 : 1
        console.log(`Calculated new order ${newOrder}`)

        const blockData = {
            user: userId,
            title: titleBlock  || `Contenitore ${newOrder + 1}`,
            order: newOrder
        }
        const newBlock = await DashboardBlock.create(blockData)
        console.log(`Block created sucesfully: ${newBlock.userId}`)
        response.status(201).send(newBlock)

    }catch(error){
        console.log(`Error block not created:`, error)
    }

}


export const updateBlock = async (request, response, next) => {

    const blockId = request.params.id
    const userId = request.user._id
    const titleBlock = request.body.title

    console.log(`Executing updateBlock hendler ${blockId} by user ${userId}`)

    try{
        const updatedBlock = await DashboardBlock.findOneAndUpdate(
            { _id: blockId, user: userId },
            { title: titleBlock.trim() },
            { new: true }
        )
        if(!updatedBlock){
            const error = new Error('Block not found')
            error.statusCode = 404
            return next(error)
        }
        console.log(`Block updated sucesfully: ${updatedBlock._id}`)
        response.status(200).json(updatedBlock)

    }catch(error){
        console.log(`Error block not updated:`, error)
        next(error)
    }
}


export const deleteBlock = async (request, response, next) => {

    const blockId = request.params.id
    const userId = request.user._id

    console.log(`Executing deleteBlock hendler ${blockId} by user ${userId}`)

    try{
        const deletedBlock = await DashboardBlock.findOneAndDelete({ _id: blockId, user: userId })

        if(!deletedBlock){
            const error = new Error("Block not found")
            error.statusCode = 404
            return next(error)
        }
        console.log(`Block ${blockId} deleted succesfully, NOW deleating note associated`)
        const deletedNotes = await Note.deleteMany({ container: blockId, user: userId })
        console.log(`Deleted ${deletedNotes.deletedCount} associated notes.`)
        response.status(204).send()

    }catch(error){
        console.log(`Error block not deleted:`, error)
        next(error)
    }
}
