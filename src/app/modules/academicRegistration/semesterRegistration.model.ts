import mongoose, { Schema } from 'mongoose'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { semesterRegistrationStatus } from './semesterRegistration.constant'


const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    uniques: true,
    ref: 'AcademicSemester',
  },
  status: {
    type: String,
    enum: semesterRegistrationStatus,
    default: 'UPCOMING',
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  minCredit: { type: Number, required: true, default: 3 },
  maxCredit: { type: Number, required: true, default: 15 },
}
,
{
  timestamps: true,
}
)

const semesterRegistrationModel = mongoose.model<TSemesterRegistration>(
  'semesterRegistration',
  semesterRegistrationSchema,
)

export const semesterRegistrationModels = { semesterRegistrationModel }
