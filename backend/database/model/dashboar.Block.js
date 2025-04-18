import mongoose, { Schema } from 'mongoose'

const dashboardBlockSchema = new Schema ({

    title: {
        type: String,
        //required: true,
        trim : true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    order: {
        type: Number,
        required: true,
    }
},
{timestamps: true}
)
dashboardBlockSchema.index({user: 1, order: 1})
const DashboardBlock = mongoose.model('DashboardBlock', dashboardBlockSchema)

export default DashboardBlock