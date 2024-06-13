import { z } from 'zod'

const createDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Department  must be string',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Department Department must be string',
      required_error: ' is required',
    }),
  }),
})

const updateDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'update must be string',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Department Department must be string',
        required_error: ' is required',
      })
      .optional(),
  }),
})

export const academicDepartmentValidation = {
  createDepartmentValidationSchema,
  updateDepartmentValidationSchema,
}
