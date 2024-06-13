import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TAcademicDepartment } from './academicDepartment.interface'
import { DepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.createDepartmentIntoDB(
    req.body as TAcademicDepartment,
  )

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department create successfully!',
    data: result,
  })
})

const getAcademicDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getDepartmentFromDB()
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic department retrieved successfully!',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.getSingleDepartmentFromDB(
    req.params.departmentId as string,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic single Department retrieved successfully!',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.updateDepartmentFromDB(
    req.params.departmentId as string,
    req.body as TAcademicDepartment,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department update successfully!',
    data: result,
  })
})

const deleteAcademicDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentServices.deleteDepartmentFromDB(
    req.params.departmentId as string,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department deleted successfully!',
    data: result,
  })
})

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
