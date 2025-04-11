import GoogleStrategy from 'passport-google-oauth20'
import User from '../database/model/user.js'
import jwt from 'jsonwebtoken'



const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/auth/google/callback'
    //process.env.SERVER_FRONTEND + process.env.API_VERSION + process.env.GOOGLE_CALLBACK_URL,
  },

  async function(accessToken, refreshToken, profile, cb){
  
    console.log(profile)

    let user = await User.findOne({googleId: profile.id})
    console.log('Sucesfully user find:', user)
  
    
    if(!user){

        const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null
        console.log('Sucesfully i fine e mail:', userEmail)

        user = await User.create({
          username: profile.displayName,
          email: userEmail,
          googleId: profile.id,
          //username : profile.displayName
        });
      console.log("Sucesfully user create")
    }

    jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
            return cb(err, { token });
        }
    )
})

export default googleStrategy
