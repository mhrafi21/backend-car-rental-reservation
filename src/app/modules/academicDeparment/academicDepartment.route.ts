import { Router } from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { academicDepartmentControllers } from './academicDepartment.controller'
import { academicDepartmentValidation } from './academicDepartment.validation'

const router = Router()

router.post(
  '/create-academic-department',
  validateRequest(
    academicDepartmentValidation.createDepartmentValidationSchema,
  ),
  academicDepartmentControllers.createAcademicDepartment,
)
router.get('/', academicDepartmentControllers.getAcademicDepartment)
router.get(
  '/:departmentId',
  academicDepartmentControllers.getSingleAcademicDepartment,
)
router.patch(
  '/:departmentId',
  validateRequest(
    academicDepartmentValidation.updateDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
)
router.delete(
  '/:departmentId',
  academicDepartmentControllers.deleteAcademicDepartment,
)

export const AcademicDepartmentRoutes = router
