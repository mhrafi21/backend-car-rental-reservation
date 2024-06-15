import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { bookingServices } from './booking.services'

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBookingIntoDB({
    user: req.body.userId,
    car: req.body.carId,
    ...req.body,
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: result,
    message: 'Booking created successfully!',
  })
})

const getBookings = catchAsync(async (req, res) => {

  const result = await bookingServices.getBookingsFromDB();

  if(!result?.length){
    sendResponse(res,{
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const getUserSpecificBookings = catchAsync(async (req, res) => {
  const email = req.user as JwtPayload;
  const result = await bookingServices.getUserSpecificBookingsFromDB(
    email
  )

  if(!result?.length){
    sendResponse(res,{
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: result,
    })
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  })
})

export const bookingControllers = {
  createBooking,
  getBookings,
  getUserSpecificBookings,
}
