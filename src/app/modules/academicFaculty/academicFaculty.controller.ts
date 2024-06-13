import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TAcademicFaculty } from './academicFaculty.interface'
import { academicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body as TAcademicFaculty,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculties create successfully!',
    data: result,
  })
})

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAcademicFacultyFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculties retrieved successfully!',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    req.params.facultyId as string,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic single faculty retrieved successfully!',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.updateAcademicFacultyFromDB(
    req.params.facultyId,
    req.body as TAcademicFaculty,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty update successfully!',
    data: result,
  })
})

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.deleteAcademicFacultyFromDB(
    req.params.facultyId as string,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty deleted successfully!',
    data: result,
  })
})

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
