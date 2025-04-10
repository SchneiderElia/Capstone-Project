import GoogleStrategy from 'passport-google-oauth20'

import jwt from 'jsonwebtoken'



const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/google'
    //process.env.SERVER_FRONTEND + process.env.API_VERSION + process.env.GOOGLE_CALLBACK_URL,
  },

  async function(accessToken, refreshToken, profile, cb){
    console.log(profile)

    let user = await User.findOne({googleId: profile.id})
    
    if(!user){
        user = await User.create({
             email : profile._jsonemails,
             googleId : profile.id,
             //username : profile.displayName
         },console.log(user))
        }

        jwt.sign(
            {userId : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '1h'},
            (err, jwtToken) => {
                return cb (error, {jwtToken : jwtToken})
            })
      
  }
  )

  export default googleStrategy