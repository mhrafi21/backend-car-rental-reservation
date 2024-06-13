import { generateAdminId, generateStudentId } from './user.utils'
import config from '../../config'
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model'
import { Student } from '../student/student.interface'
import { StudentModel } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import mongoose, { startSession } from 'mongoose'
import AppError from '../../errors/AppError'
import { TAdmin } from '../Admin/admin.interface'
import httpStatus from 'http-status'
import { Admin } from '../Admin/admin.model'

const createUserIntoDB = async (password: string, studentData: Student) => {
  // create a user object

  const userData: Partial<TUser> = {}

  // if password is not given, use default pass

  userData.password = password || (config.Default_pass as string)

  // set student role

  userData.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    studentData.admissionSemester,
  )

  // set manually generated id

  userData.id = await generateStudentId(admissionSemester as TAcademicSemester)

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    // create a user (transaction 1)
    const newUser = await User.create([userData], { session })

    /// create student
    //Object.keys(result).length
    if (!newUser) {
      throw new AppError(404, 'failed to create user!')
    }
    // set id, _id, as user
    studentData.id = newUser[0].id
    studentData.user = newUser[0]._id // refactor reference id

    // create a student (transaction 2)
    const newStudent = await StudentModel.create([studentData], { session })

    if (!newStudent.length) {
      throw new AppError(404, 'failed to create new Student!')
    }
    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export { createUserIntoDB, createAdminIntoDB }
