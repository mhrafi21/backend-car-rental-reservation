import express from 'express'
import { UserController } from './user.controller'
import { userValidation } from './user.validation'
import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(userValidation.userValidationSchema),
  UserController.createUser,
)

router.post('/login', UserController.loginUser)
export const userRouter = router
