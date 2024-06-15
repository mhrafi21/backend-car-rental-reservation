import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { TBooking } from './booking.interface'
import { bookingModels } from './booking.model'
import { JwtPayload } from 'jsonwebtoken'

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await bookingModels.BookingModel.create(payload)
  return result
}

const getBookingsFromDB = async () => {
  const result = await bookingModels.BookingModel.find()
    .populate('user')
    .populate('car')
  return result
}

const getUserSpecificBookingsFromDB = async (email: JwtPayload) => {

  // Find the data record(s) associated with the user
  const user = await User.findOne({email: email});
  const result = await bookingModels.BookingModel.find({user: user?._id}).populate("user").populate("car")
 
  return result
}

export const bookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  getUserSpecificBookingsFromDB,
}
