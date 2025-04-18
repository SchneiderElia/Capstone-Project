import { Router } from 'express'


/////////  ROUTS  ////////////
import { getHome, postLogIn, postSignIn } from './controller/home.js'
import { getDashboard,} from './controller/dashboard.js'
import { createBlock, updateBlock, deleteBlock } from './controller/blocks.js'
import { getNotes } from './controller/dashboard.Note.js'
import { createNote } from './controller/notes.js'




import authorization from './middleware/authorization.route.js'
import passport from 'passport'



const router = Router()


/////////  HOME routes ////////////

router.get ('/', getHome)
router.post('/login', postLogIn)
router.post('/signin', postSignIn)

/////////  GOOGLE routes LOGIN+REGISTERED   ////////////

router.get ('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
    }))

router.get('/auth/google/callback', passport.authenticate('google', {
    session : false
}),
        (request, response, next) =>{
           return response.redirect(process.env.SERVER_FRONTEND + '/dashboard?jwt=' + request.user.token)
        }
    )

/////////  DASHBOARD routes ////////////
//router.use(authorization)

router.get('/dashboard', getDashboard)


/////////  BLOCKS   ////////////

router.post("/blocks", createBlock)
router.put("/blocks/:id", updateBlock)
router.delete("/blocks/:id", deleteBlock)


/////////  NOTES in to BLOCKS   ////////////

router.get("/blocks/:id/notes", getNotes)
router.post("/blocks/:id/notes", createNote)
//router.put("/notes/:id", updateNote)
//router.delete("/notes/:id", deleteNote)


export default router
