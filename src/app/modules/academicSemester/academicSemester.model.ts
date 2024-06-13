import { Schema, model } from 'mongoose'

import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant'

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: AcademicSemesterName, required: true },
  year: { type: String, required: true },
  code: { type: String, enum: AcademicSemesterCode, required: true },
  startMonths: { type: String, enum: Months, required: true },
  endMonths: { type: String, enum: Months, required: true },
})

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })
  if (isSemesterExists) {
    throw new Error('Semester is already exists')
  }
  next()
})

export const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)

// check name and year -> check semester;
// we can't create same name semester in a year;
// let's validate it;
