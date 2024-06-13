import { createAdminIntoDB, createUserIntoDB } from './user.service'
import { Student } from '../student/student.interface'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res, next) => {
  const studentData = req.body

  const result = await createUserIntoDB(
    studentData.password as string,
    studentData as Student,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully create student info',
    data: result,
  });

})


const createAdmin = catchAsync(async (req, res) => {
  const { password } = req.body;
  const result = await createAdminIntoDB(password, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});


export const UserController = {
  createUser,
  createAdmin
}
