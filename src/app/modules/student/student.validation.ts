import { z } from 'zod'
import { Types } from 'mongoose'

// Define the Zod schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
})

// Define the Zod schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
})

// Define the Zod schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactNo: z.string(),
  address: z.string(),
})

// Define the Zod schema for Student
const StudentValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    user: z.instanceof(Types.ObjectId), // Assuming `user` is a MongoDB ObjectId
    name: UserNameValidationSchema,
    gender: z.enum(['male', 'female']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergenceContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    admissionSemester: z.string(),
    profileImg: z.string().optional(),
  }),
})

// Export the schemas if you need to use them elsewhere
export {
  UserNameValidationSchema,
  GuardianValidationSchema,
  LocalGuardianValidationSchema,
  StudentValidationSchema,
}
