import { Router } from 'express'
import jwt from 'jsonwebtoken'


/////////  ROUTS  ////////////
import { getHome, postLogIn, postSignIn } from './controller/home.js'
import { getDashboard,} from './controller/dashboard.js'
import { getSingleBlock, createBlock, updateBlock, deleteBlock } from './controller/blocks.js'
import { getNotes } from './controller/dashboard.Note.js'
import { createNote, updateNote, deleteNote } from './controller/notes.js'




import authorization from './middleware/authorization.route.js'
import passport from 'passport'



const router = Router()


/////////  HOME routes ////////////

router.get ('/', getHome)
router.post('/login', postLogIn)
router.post('/signin', postSignIn)

/////////  GOOGLE routes LOGIN+REGISTERED   ////////////

router.get ('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'], 
    session : false
    }))

/* router.get('/auth/google/callback', passport.authenticate('google', {
    session : false
}),
        (request, response, next) =>{
           return response.redirect(process.env.SERVER_FRONTEND + '/dashboard?jwt=' + request.user.token)
        }
    ) */

    router.get('/auth/google/callback', passport.authenticate('google', {
        session : false
    }),
        (request, response,next) => {
            console.log('Google Callback Route Handler: User authenticated by Passport:', request.user?._id)

            if(!request.user || !request.user._id){
                console.error('User object not found on request after Google auth.')
                return response.redirect(process.env.SERVER_FRONTEND + '/login?error=auth_failed')
            }

            try{
                const payload = { userId: request.user._id }
                const secret = process.env.JWT_SECRET
                const options = { expiresIn: '1h' }
                const jwtToken = jwt.sign(payload, secret, options)

                console.log('Generated application JWT:', jwtToken)

                const frontendCallbackUrl = `${process.env.SERVER_FRONTEND}/auth/google/callback?token=${jwtToken}`
                console.log('Redirecting browser to frontend callback:', frontendCallbackUrl)

              /*   response.status(200).json({
                    "status" : "success",
                    "message" : "User successfully logged",
                    "token" : jwtToken
                }) */

                return response.redirect(process.env.SERVER_FRONTEND +"/auth/google/callback" + '?token=' + jwtToken)
            }catch(error){
                console.error('Error generating JWT:', error)
                response.redirect(`${process.env.CLIENT_URL}/login?error=token_generation_failed`)
            
            }
        }
    )
        


/////////  DASHBOARD routes ////////////
router.use(authorization)

router.get('/dashboard', getDashboard)


/////////  BLOCKS   ////////////

router.get("/blocks/:id", getSingleBlock)
router.post("/blocks", createBlock)
router.put("/blocks/:id", updateBlock)
router.delete("/blocks/:id", deleteBlock)


/////////  NOTES in to BLOCKS   ////////////

router.get("/blocks/:id/notes", getNotes)
router.post("/blocks/:id/notes", createNote)
router.put("/notes/:id", updateNote)
router.delete("/notes/:id", deleteNote)


export default router
