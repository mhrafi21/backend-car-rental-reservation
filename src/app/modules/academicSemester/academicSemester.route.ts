import express from 'express'
import { AcademicSemesterControllers } from './academicSemester.controller'
import validateRequest from '../../middlewares/validateRequest'
import { createAcademicSemesterValidationSchema } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.crateAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAcademicSemester)
router.get('/:id', AcademicSemesterControllers.singleGetAcademicSemester)

export const AcademicSemesterRoutes = router
