import mongoose, { Schema } from 'mongoose'
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourse,
} from './course.interface'

const preRequisiteCourseSchema = new Schema<TPreRequisiteCourse>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },

  isDeleted: { type: Boolean, default: false },
})

const courseSchema = new Schema<TCourse>({
  title: { type: String, required: true, trim: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, required: true },
  credits: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourse: [preRequisiteCourseSchema],
})

const courseModel = mongoose.model<TCourse>('Course', courseSchema)

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', unique: true },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

const courseFacultyModel = mongoose.model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema
)

export { courseModel,courseFacultyModel }
