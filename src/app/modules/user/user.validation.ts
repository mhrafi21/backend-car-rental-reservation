import { z } from 'zod'

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Name must be string',
    }),
    email: z.string({
      invalid_type_error: 'Email must be string',
    }),
    role: z.enum(['user', 'admin']),
    phone: z.string({
      invalid_type_error: 'Phone must be string',
    }),
    address: z.string({
      invalid_type_error: 'Address must be string',
    }),
  }),
})

export const userValidation = {
  userValidationSchema,
}
