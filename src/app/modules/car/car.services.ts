import { TBooking } from './../booking/booking.interface'
import { bookingModels } from '../booking/booking.model'
import { TCar } from './car.interface'
import { carModels } from './car.model'
import { priceCalculate } from './car.utils'
import noDataFound from '../../utils/notDataFound'
import httpStatus from 'http-status'

const createCarIntoDB = async (payload: TCar) => {
  const result = await carModels.carModel.create(payload)
  return result
}

const getAllCarFromDB = async () => {
  const result = await carModels.carModel.find({})
  return result
}

const getSingleCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findById(id)
  return result
}

const updateCarFromDB = async (id: string, payload: TCar) => {
  const result = await carModels.carModel.findByIdAndUpdate(id, {
    new: true,
    payload,
    runValidators: true,
  })
  return result
}

const deleteCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findByIdAndDelete(id).exec()
  return result
}

const updateBookingCarIntoDB = async (bookingId: string, endTime: string) => {
  const booking = await bookingModels.BookingModel.findById(bookingId as string)
    .populate('car')
    .populate('user')

  if (!booking) {
    noDataFound({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No data Found',
      data: booking,
    })
  }

  const totalCost = priceCalculate(booking as TBooking, endTime as string)

  const result = await bookingModels.BookingModel.findByIdAndUpdate(
    bookingId,
    {
      endTime,
      totalCost,
    },
    { new: true },
  )
    .populate('user')
    .populate('car')

  return result
}

const softDeleteCarFromDB = async (id: string) => {
  console.log(softDeleteCarFromDB)
  const result = await carModels.carModel.findByIdAndUpdate(id, {
    isDeleted: true,
  })

  return result
}

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  deleteCarFromDB,
  updateBookingCarIntoDB,
  softDeleteCarFromDB,
}
