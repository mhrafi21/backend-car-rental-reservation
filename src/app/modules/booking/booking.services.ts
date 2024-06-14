import mongoose from 'mongoose'
import { User } from '../user/user.model'
import { TBooking } from './booking.interface'
import { bookingModels } from './booking.model'

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

const getUserSpecificBookingsFromDB = async (email: string) => {
  // Find the user by email
  const user = await User.findOne({ email: email as string })
  console.log(user);
  // Find the data record(s) associated with the user
  const result = await bookingModels.BookingModel.find({user:user._id}).populate("user").populate("car")

  return result
}

export const bookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,
  getUserSpecificBookingsFromDB,
}
