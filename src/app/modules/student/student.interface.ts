import { Types } from 'mongoose'

export type UserName = {
  firstName: string
  middleName: string
  lastName: string
}

export type Guardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type LocalGuardian = {
  id: string
  name: string
  contactNo: string
  address: string
}

export type Student = {
  id: string
  user: Types.ObjectId
  name: UserName
  gender: 'male' | 'female'
  dateOfBirth?: string
  email: string
  contactNo: string
  emergenceContactNo: string
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  admissionSemester: Types.ObjectId
  profileImg?: string
}
