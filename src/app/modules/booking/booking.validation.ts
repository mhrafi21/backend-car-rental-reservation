
import  {Types}  from 'mongoose'
import { z } from 'zod'

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: 'Invalid date format. Should be YYYY-MM-DD.',
    }),
    user: z.instanceof(Types.ObjectId).optional(),
    car: z.instanceof(Types.ObjectId).optional(),
    startTime: z
      .string()
      .refine(val => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
        message: 'Invalid time format. Should be HH:MM (24hr format).',
      }),
    endTime: z.string().refine(val => /^([01]\d|2[0-3]):([0-5]\d)$/.test(val), {
      message: 'Invalid time format. Should be HH:MM (24hr format).',
    }).default("null"),
    totalCost: z.number().nonnegative().default(0).optional(),
  }),
})

export const bookingValidation = { bookingValidationSchema }
