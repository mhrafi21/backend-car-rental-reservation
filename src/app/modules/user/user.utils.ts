// auto generate id;

import { TAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean()

  // 2030 01 0001 from 0001 here it's increasing;
  return lastStudent?.id ? lastStudent?.id.substring(6) : undefined
}

// year, semester code, 4 digit number
export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000 and then increase 1
  // let currentId: string =  await findLastStudent() || (0).toString();

  let currentId = (0).toString()

  let lastStudentId = await findLastStudent()
  // 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6) // 01;
  const lastYear = lastStudentId?.substring(0, 4) // 2030
  const currentSemesterCode = payload.code
  const currentYear = payload.year

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastYear === currentYear
  ) {
    currentId = lastStudentId.substring(6)
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0')
  incrementId = `${payload.year}${payload.code}${incrementId}`
  return incrementId
}

// Admin ID
export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};


export const generateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `A-${incrementId}`;
  return incrementId;
};
