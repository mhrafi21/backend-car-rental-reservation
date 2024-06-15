import { createUserIntoDB, loginUserFromDB } from './user.service'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'

import { TUser } from './user.interface'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body as TUser)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const { result, token } = await loginUserFromDB(req.body as TUser)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: result,
    token: token,
  })
})

export const UserController = {
  createUser,
  loginUser,
}
