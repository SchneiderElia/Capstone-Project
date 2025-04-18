import User from "../../database/model/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



/////////  GET   ////////////

export const getHome = async (request, response, next) => {
    
    const now = new Date()
    
    const apiSatus = {
        status: "OK",
        message: "Backend API is running correctly.",
        apiVersion: process.env.API_VERSION,
        timestamp: now.toISOString(), 
        serverLocationInfo: { 
            location: "Italy",
            timezone: "Europe/Rome",
            currentTime: now.toLocaleString('it-IT', { timeZone: 'Europe/Rome' })
        }
    }
    response.status(200).json(apiSatus)
}

/////////   POST LOGIN  ////////////

export const postLogIn = async(request, response, next) => {
    
    const {email, username, password} = request.body

    if(!email && !username || !password){
        const error = new Error('Missing Credentials')
        error.statusCode = 400
        return next(error)
    }
    

    try{
        const user = await User.findOne({
            $or : [
           ...(email ? [{email}] : []),
           ...(username ? [{username}] : [])
        ]}).select('+password')

        if(!user){
            const error = new Error('Wrong Credentials')
            error.statusCode = 401
            return next(error)
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            const error = new Error('Wrong Credentials')
            error.statusCode = 401
            return next(error)
        }
        if(!process.env.JWT_SECRET){
            console.error("Critical Error; JWT_SECRET is not defined")
            return next(new Error("Internal Server Error"))
        }

        const payload = {userId : user._id}
        const secret = process.env.JWT_SECRET
        const options = {expiresIn : '1h'}

        const jwtToken = jwt.sign(payload, secret, options)

        response.status(200).json({
            "status" : "success",
            "message" : "User successfully logged",
            "token" : jwtToken
        })
        console.log('User successfully logged') 

    }catch(error){
        console.error('Something wrong in the login process:', error.message)
        next(error)
    }    
}


/////////   POST SINGIN  ////////////

export const postSignIn = async (request, response, next) => {

   try{

    const newUser = await User.create(request.body)
    console.log('New user successfully created')
    response.send(newUser).status(201)

   }catch(error){

    console.error('Something wrong in the user creation process:', error.message)
    next(error)

   }
}
