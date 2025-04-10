import express from 'express'
import passport from 'passport'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router/router.js'
import errorHandlerMiddleware from './router/middleware/errorHendlerMiddeware.js'

import googleStrategy from './configuration/passport.js'











const server = express()
server.use(express.json())
server.use(cors())

passport.use(googleStrategy)

server.use(process.env.API_VERSION, router)
server.use(errorHandlerMiddleware)

async function connctionStart() {

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.clear()
    console.log("Successfully connected to MongoDB!")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
  }

  server.listen(process.env.PORT, () => {
    //console.clear()
    console.log(`Server running on port ${process.env.PORT}`)

  })

}connctionStart()


  



