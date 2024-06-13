import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const crateAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoBD(
    req.body,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  })
})

const getAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAcademicSemesterIntoDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Semester is retrieved successfully',
    data: result,
  })
})

const singleGetAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.singleGetAcademicSemesterIntoDB(
    req.params.id as string,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic specific semester is retrieved',
    data: result,
  })
})

export const AcademicSemesterControllers = {
  crateAcademicSemester,
  getAcademicSemester,
  singleGetAcademicSemester,
}
