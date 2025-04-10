import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({

    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select : false,
    }
})

userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) return next()

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})
    

const User = mongoose.model('User', userSchema)

export default User