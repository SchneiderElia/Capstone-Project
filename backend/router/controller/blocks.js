import DashboardBlock from "../../database/model/dashboar.Block.js"
import Note from "../../database/model/note.js"    


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
        response.status(200).send(updatedBlock)

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
