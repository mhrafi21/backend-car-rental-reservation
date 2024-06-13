import { Request, Response } from 'express'
import { academicSemesterNameCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemesterModel } from './academicSemester.model'

const createAcademicSemesterIntoBD = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw Error('Invalid Semester code!')
  }
  const result = await AcademicSemesterModel.create(payload)
  return result
}

const getAcademicSemesterIntoDB = async () => {
  const result = await AcademicSemesterModel.find({})
  return result
}

const singleGetAcademicSemesterIntoDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id)
  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterIntoBD,
  getAcademicSemesterIntoDB,
  singleGetAcademicSemesterIntoDB,
}
