import { academicDepartmentModels } from './academicDeparment.model'
import { TAcademicDepartment } from './academicDepartment.interface'

const createDepartmentIntoDB = async (departmentName: TAcademicDepartment) => {
  const isExistDepartment =
    await academicDepartmentModels.academicDepartmentModel.findOne({
      name: departmentName.name,
    })

  if (isExistDepartment) {
    throw new Error('This department is already exists!')
  }

  const result =
    await academicDepartmentModels.academicDepartmentModel.create(
      departmentName,
    )
  return result
}

const getDepartmentFromDB = async () => {
  const result = await academicDepartmentModels.academicDepartmentModel
    .find()
    .populate('academicFaculty')
  return result
}

const getSingleDepartmentFromDB = async (departmentId: string) => {
  const result = await academicDepartmentModels.academicDepartmentModel
    .findById(departmentId)
    .populate('academicFaculty')
  return result
}

const updateDepartmentFromDB = async (
  departmentId: string,
  departmentName: TAcademicDepartment,
) => {
  const result =
    await academicDepartmentModels.academicDepartmentModel.findByIdAndUpdate(
      departmentId,
      departmentName,
      { new: true, runValidators: true },
    )
  return result
}

const deleteDepartmentFromDB = async (departmentId: string) => {
  const result =
    await academicDepartmentModels.academicDepartmentModel.findByIdAndDelete(
      departmentId,
    )
  return result
}

export const DepartmentServices = {
  createDepartmentIntoDB,
  getDepartmentFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentFromDB,
  deleteDepartmentFromDB,
}
