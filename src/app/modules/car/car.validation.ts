import { z } from 'zod'

const carValidationSchema = z.object({
  body: z.object({
    name: z.string({invalid_type_error: "name must be string"}),
    description: z.string(),
    color: z.string(),
    isElectric: z.boolean(),
    status: z.enum(['available', 'unavailable']).default('available'),
    features: z.array(z.string()),
    pricePerHour: z.number({invalid_type_error: "price per hour must be number"}),
    isDeleted: z.boolean({invalid_type_error: "it should be boolean"}),
  }),
})
const updateCarValidationSchema = z.object({
  body: z.object({
    name: z.string({invalid_type_error: "name must be string"}).optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.enum(['available', 'unavailable']).default('available').optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z.number({invalid_type_error: "price per hour must be number"}).optional(),
    isDeleted: z.boolean({invalid_type_error: "it should be boolean"}).optional(),
  }),
})

export const carValidation = {
  carValidationSchema,
  updateCarValidationSchema
}
