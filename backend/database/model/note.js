import mongoose, { Schema } from "mongoose"

const notesSchema = new Schema ({

    title : {
        type : String,
        default : 'Untitled Note',
        trim: true,
    },
    textContent: {
        type: String,
        default : '',
    },
    order: {
        type: Number,
    },
    container: {
        type: Schema.Types.ObjectId,
        ref: 'DashboardBlock',
        required: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    }

},
{timestamps: true}
)
notesSchema.index({container: 1, order: 1})
const Note = mongoose.model('Note', notesSchema)

export default Note