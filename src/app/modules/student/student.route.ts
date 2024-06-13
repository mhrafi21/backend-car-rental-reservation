import express from 'express'
import { createStudent, getStudents } from './student.controller'
import { StudentValidationSchema } from './student.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(StudentValidationSchema),
  createStudent,
)

router.get('/', getStudents)
export const StudentRoutes = router
