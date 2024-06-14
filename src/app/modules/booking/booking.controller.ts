import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TBooking } from './booking.interface'
import { bookingServices } from './booking.services'

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB(req.body as TBooking)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Booking created successfully!',
  })
})

const getBookings = catchAsync(async (req, res) => {
  const { carId, date } = req.query
  const result = await bookingServices.getBookingsFromDB(carId, date)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const getUserSpecificBookings = catchAsync(async (req, res) => {
    const {email} = req.query;
    const result = await bookingServices.getUserSpecificBookingsFromDB(email as string);
  sendResponse(res,{
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  })
})

export const bookingControllers = { createBooking, getBookings,getUserSpecificBookings }
