import AppError from "../../errors/AppError";
import { AcademicSemesterModel } from "../academicSemester/academicSemester.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  const isExists = await AcademicSemesterModel.findById(academicSemester);

  if(isExists){
    throw new AppError(404, "This academic semester not found")
  }
  const result = await SemesterRegistrationModel.create(payload)
  
}

const getSemesterRegistrationFromDB = async () => {
 
}

const getSingleSemesterRegistrationFromDB = async (facultyId: string) => {
 
}

const updateSemesterRegistrationFromDB = async (
id: string, semesterRegistration : Partial<TSemesterRegistration>
) => {
  
}



export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationFromDB
}
