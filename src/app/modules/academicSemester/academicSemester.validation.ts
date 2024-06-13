import { z } from 'zod'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant'

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonths: z.enum([...Months] as [string, ...string[]]),
    endMonths: z.enum([...Months] as [string, ...string[]]),
  }),
})

export { createAcademicSemesterValidationSchema }
