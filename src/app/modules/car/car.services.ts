import { TCar } from './car.interface'
import { carModels } from './car.model'

const createCarIntoDB = async (payload: TCar) => {
  const result = await carModels.carModel.create(payload)
  return result
}

const getAllCarFromDB = async () => {
  const result = await carModels.carModel.find({})
  return result
}

const getSingleCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findById(id)
  return result
}

const updateCarFromDB = async (id: string, payload: TCar) => {
  const { features, ...carInfo } = payload

  const result = await carModels.carModel.findByIdAndUpdate(
    id,
    { new: true,carInfo, runValidators: true },
    
  )
  return result
}

const deleteCarFromDB = async (id: string) => {
  const result = await carModels.carModel.findByIdAndDelete(id)
  return result
}

export const carServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarFromDB,
  deleteCarFromDB,
}
