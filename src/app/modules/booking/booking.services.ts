
import { TBooking } from './booking.interface'
import { bookingModels } from './booking.model'

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await bookingModels.BookingModel.create(payload)
  return result
}

const getBookingsFromDB = async (carId, date) => {
  const result = await bookingModels.BookingModel.find()
    .populate('user')
    .populate('car')
  return result
}


export const bookingServices = {
  createBookingIntoDB,
  getBookingsFromDB,

}
