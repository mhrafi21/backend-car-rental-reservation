import express, { Response, Request } from 'express'
import { UserController } from './user.controller'
import { createAdminValidationSchema } from '../Admin/admin.validation'
import auth from '../../middlewares/auth'

const router = express.Router()

router.post('/create-student', auth(), UserController.createUser)
router.post("/create-admin", UserController.createAdmin )
export const userRouter = router
