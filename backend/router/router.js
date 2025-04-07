import express, { request, response } from 'express'
import { Router } from 'express'


/////////  ROUTS  ////////////
import { getHome, postLogIn, postSignIn } from './controller/home.js'
import { getDashboard } from './controller/dashboard.js'

import authorization from './middleware/authorization.route.js'

const router = Router()


/////////  HOME router ////////////

router.get ('/', getHome)
router.post('/login', postLogIn)
router.post('/signin', postSignIn)

/////////  DASHBOARD router ////////////
router.use(authorization)

router.get('/dashboard', getDashboard)




export default router