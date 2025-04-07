import jwt from 'jsonwebtoken'
import User from '../../database/model/user.js'


const authorization = async (request, response, next) => {
    console.log('Middleware Authorization Start')
  const authHeader = request.headers.authorization
  try{
  if(!authHeader){
    const error = new Error('Authorization header missing')
    error.statusCode = 401
    return next(error)
  }

  const parts = authHeader.split(' ')
  if(parts.length !== 2 || parts[0] !== 'Bearer'){
    const error = new Error('Invalid authorization header format')
    error.statusCode = 401
    return next(error)
  }

  const token = parts[1]

 
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.userId)
    if(!user){
      const error = new Error('User not found')
      error.statusCode = 404
      return next(error)
    }
    request.user = user
    next()
    }catch(error){
    error.statusCode = 401
    return next(error)
  }
}

export default authorization