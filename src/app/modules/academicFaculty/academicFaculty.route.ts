import { Router } from 'express'
import { academicFacultyControllers } from './academicFaculty.controller'
import validateRequest from '../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'

const router = Router()

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.createAcademicFaculty,
)
router.get('/', academicFacultyControllers.getAcademicFaculties)
router.get('/:facultyId', academicFacultyControllers.getSingleAcademicFaculty)
router.patch(
  '/:facultyId',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  academicFacultyControllers.updateAcademicFaculty,
)
router.delete('/:facultyId', academicFacultyControllers.deleteAcademicFaculty)

export const AcademicFacultyRoutes = router
