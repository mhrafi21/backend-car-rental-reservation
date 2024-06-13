import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { semesterRegistrationServices } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationServices.createSemesterRegistrationIntoDB(
    req.body as TSemesterRegistration,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration create successfully!',
    data: result,
  })
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationServices.getSemesterRegistrationFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration retrieved successfully!',
    data: result,
  })
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(
    req.params.facultyId as string,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration single faculty retrieved successfully!',
    data: result,
  })
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationServices.updateSemesterRegistrationFromDB(
    req.params.semesterRegistrationId,
    req.body as TSemesterRegistration,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Semester Registration update successfully!',
    data: result,
  })
})

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
}
