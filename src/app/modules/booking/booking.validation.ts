import { z } from 'zod'

const bookingValidationSchema = z.object({
  body: z.object({
    date: z.string(),
    user: z.string().optional(),
    car: z.string().optional(),
    startTime: z.string(),
    endTime: z.string().nullable().default(null),
    totalCost: z.number().nullable().default(0),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
  }),
})

export const bookingValidation = { bookingValidationSchema }
