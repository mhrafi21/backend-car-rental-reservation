import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TCourse, TCourseFaculty } from './course.interface'
import { CourseServices } from './course.services'

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body as TCourse)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course create successfully!',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res) => {
console.log("test", req.user)
  const result = await CourseServices.getAllCourseFromDB(req.query)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course retrieved successfully!',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getSingleCourseFromDB(req.params.courseId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Single Course retrieved successfully!',
    data: result,
  })
})

const updateCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.updateCourseIntoDB(
    req.params.courseId as string,
    req.body,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully!',
    data: result,
  })
})

const deleteCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.deleteCourseFromDB(req.params.courseId)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course deleted successfully!',
    data: result,
  })
})

const assignFaculties = catchAsync(async (req, res) => {
  const {courseId} = req.params;
  const {faculties} = req.body;
  const result = await CourseServices.assignFacultiesIntoDB(courseId,faculties)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course faculties successfully added!',
    data: result,
  })
})

export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  assignFaculties,
  deleteCourse,
}

