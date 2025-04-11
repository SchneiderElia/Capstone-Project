import { Router } from 'express'


/////////  ROUTS  ////////////
import { getHome, postLogIn, postSignIn } from './controller/home.js'
import { getDashboard } from './controller/dashboard.js'


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
router.use(authorization)

router.get('/dashboard', getDashboard)





export default router
