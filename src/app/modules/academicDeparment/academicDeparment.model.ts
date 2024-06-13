import mongoose, { Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, unique: true, required: true },

    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },

  { timestamps: true },
)

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  console.log(query)

  const isDepartmentExist = await academicDepartmentModel.findOne(query)

  if (!isDepartmentExist) {
    throw new AppError(404, "The department doesn't exist")
  }

  next()
})

const academicDepartmentModel = mongoose.model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)

export const academicDepartmentModels = { academicDepartmentModel }
