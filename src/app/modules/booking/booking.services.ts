import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { TBooking } from './booking.interface'
import { bookingModels } from './booking.model'
import { JwtPayload } from 'jsonwebtoken'
import noDataFound from '../../utils/notDataFound'
import httpStatus from 'http-status'

const createBookingIntoDB = async (email : string ,payload: TBooking) => {

  const user = await User.findOne({ email: email })

  if (!user) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: user,
    })
  }

  const result = await bookingModels.BookingModel.create({
   ...payload,
    user: user?._id,
  })

  return result
}

const getBookingsFromDB = async () => {
  const result = await bookingModels.BookingModel.find({})
    .populate('user')
    .populate('car')

  return result
}

const getUserSpecificBookingsFromDB = async (email: JwtPayload) => {
  // Find the data record(s) associated with the user
  const user = await User.findOne({ email: email })

  if (!user) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data found',
      data: user,
    })
  }

  const result = await bookingModels.BookingModel.find({ user: user?._id })
    .populate('user')
    .populate('car')
  return result
}

export const bookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  getUserSpecificBookingsFromDB,
}
