import { z } from 'zod'

const userValidationSchema = z.object({
  id: z.string().optional(),
  password: z
    .string()
    .max(20, { message: "password can't be more than 20 character" }),
  needsPasswordChange: z.boolean().optional().default(true),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
  isDeleted: z.boolean().optional().default(false),
})

export const userValidation = {
  userValidationSchema,
}
