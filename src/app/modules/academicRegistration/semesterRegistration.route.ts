import { Router } from 'express'
import { semesterRegistrationControllers } from './semesterRegistration.controller'
import validateRequest from '../../middlewares/validateRequest'
import { semesterRegistrationValidation } from './semesterRegistration.validation'

const router = Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    semesterRegistrationValidation.semesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.createSemesterRegistration,
)
router.get('/', semesterRegistrationControllers.getAllSemesterRegistration)
router.get('/:semesterRegistrationId', semesterRegistrationControllers.getSingleSemesterRegistration)
router.patch(
  '/:semesterRegistrationId',
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
)

export const semesterRegistrationRoutes = router
