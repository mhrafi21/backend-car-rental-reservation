import jwt from 'jsonwebtoken'
import httpStatus from 'http-status'
import { TUser } from './user.interface'
import { User } from './user.model'
import config from '../../config'
import noDataFound from '../../utils/notDataFound'

const createUserIntoDB = async (payload: TUser) => {
  // create a user object
  const result = await User.create(payload)
  return result
}

const loginUserFromDB = async (payload: TUser) => {
  
  const result = await User.findOne({
    email: payload?.email,
    password: payload?.password,
  })

  if (!result) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: result
    })
  }

  // generate token for a login user

  const SignInToken = jwt.sign(
    { email: result?.email, role: result?.role },
    config.JWT_SECRET as string,
    { expiresIn: '5d' },
  )

  const token = `Bearer ${SignInToken}`

  return {
    result,
    token,
  }
}

export { createUserIntoDB, loginUserFromDB }
