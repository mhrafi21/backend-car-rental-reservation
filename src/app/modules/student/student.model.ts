import mongoose, { Schema } from 'mongoose'
import { Guardian, LocalGuardian, UserName, Student } from './student.interface'

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1)
        return firstName === value
      },
    },
    message: '{VALUE} is not capitalize format',
  },
  middleName: {
    type: String,
    trim: true,
    required: [true, 'Middle name is required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    // using validator library;
  },
})

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardianSchema = new Schema<LocalGuardian>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new mongoose.Schema<Student>({
  id: { type: String, required: true, unique: true },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User is is required'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergenceContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  admissionSemester: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester',
  },
})

export const StudentModel = mongoose.model<Student>('student', studentSchema)
