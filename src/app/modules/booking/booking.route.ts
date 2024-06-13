import express from 'express'
import { bookingControllers } from './booking.controller'
import validateRequest from '../../middlewares/validateRequest'
import { bookingValidation } from './booking.validation'
const router = express.Router()

router.post(
  '/',

  bookingControllers.createBooking,
)

router.get("/", bookingControllers.getBookings);


export const bookingRoutes = router;