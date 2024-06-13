import mongoose, { Schema } from 'mongoose'
import { TAcademicFaculty } from './academicFaculty.interface'

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, unique: true, required: true },
  },
  { timestamps: true },
)

const academicFacultyModel = mongoose.model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
)

export const academicFacultyModels = { academicFacultyModel }
