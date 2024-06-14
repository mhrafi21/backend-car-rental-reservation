import mongoose, { Schema } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    car: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Car',
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
)

const BookingModel = mongoose.model<TBooking>('Booking', bookingSchema)

export const bookingModels = { BookingModel }
