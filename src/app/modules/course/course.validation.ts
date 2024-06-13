import { z } from 'zod'

const preRequisiteValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
})

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string({
      invalid_type_error: 'Course must be string',
    }),
    prefix: z.string({
      invalid_type_error: 'Course code must be string',
    }),
    code: z.number({
      invalid_type_error: 'Course department must be string',
    }),
    credits: z.number({
      invalid_type_error: 'Course credit must be number',
    }),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(preRequisiteValidationSchema).optional(),
  }),
})

const updatePreRequisiteValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
})

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        invalid_type_error: 'Course must be string',
      })
      .optional(),
    prefix: z
      .string({
        invalid_type_error: 'Course code must be string',
      })
      .optional(),
    code: z
      .number({
        invalid_type_error: 'Course code must be string',
      })
      .optional(),
    credits: z
      .number({
        invalid_type_error: 'Course credit must be number',
      })
      .optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourse: z.array(updatePreRequisiteValidationSchema).optional(),
  }),
})


const assignFacultiesWithCourseValidation = {
  body: z.object({
   course: z.string(),
   faculties: z.string()
  })
}

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  assignFacultiesWithCourseValidation
}
