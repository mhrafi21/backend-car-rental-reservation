import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { courseValidations } from './course.validation'
import { courseControllers } from './course.controllers'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
)

router.get('/',auth(), courseControllers.getAllCourse)

router.get('/:courseId', courseControllers.getSingleCourse)

router.patch(
  '/:courseId',
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
)

router.put('/:courseId/assign-faculties',
  courseControllers.assignFaculties)

router.delete('/:courseId', courseControllers.deleteCourse)

export const courseRoutes = router
