import  jwt  from 'jsonwebtoken';
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TUser } from './user.interface'
import { User } from './user.model'
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  // create a user object
  const result = await User.create(payload)
  return result
}

const loginUserFromDB = async (payload: TUser) => {
  const result = await User.findOne(
    {
      email: payload?.email,
      password: payload?.password,
    }
  )

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "User is not found!")
  }

  // generate token for a login user 

  const SignToken = jwt.sign({email: result?.email, role: result?.role}, config.JWT_SECRET as string, {expiresIn: "5d"})

  const token = `Bearer ${SignToken}`
  
  return {
    result,
    token
  }
}

export { createUserIntoDB, loginUserFromDB }
