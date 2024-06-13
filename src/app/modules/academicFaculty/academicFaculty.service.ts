import { TAcademicFaculty } from './academicFaculty.interface'
import { academicFacultyModels } from './academicFaculty.model'

const createAcademicFacultyIntoDB = async (facultyName: TAcademicFaculty) => {
  const result =
    await academicFacultyModels.academicFacultyModel.create(facultyName)
  return result
}

const getAcademicFacultyFromDB = async () => {
  const result = await academicFacultyModels.academicFacultyModel.find({})
  return result
}

const getSingleAcademicFacultyFromDB = async (facultyId: string) => {
  const result =
    await academicFacultyModels.academicFacultyModel.findById(facultyId)
  return result
}

const updateAcademicFacultyFromDB = async (
  facultyId: string,
  facultyName: TAcademicFaculty,
) => {
  const result =
    await academicFacultyModels.academicFacultyModel.findByIdAndUpdate(
      facultyId,
      facultyName,
      { new: true, runValidators: true },
    )
  return result
}

const deleteAcademicFacultyFromDB = async (facultyId: string) => {
  const result =
    await academicFacultyModels.academicFacultyModel.findByIdAndDelete(
      facultyId,
    )
  return result
}

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyFromDB,
  deleteAcademicFacultyFromDB,
}
