import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TCar } from './car.interface'
import { carServices } from './car.services'

const createCar = catchAsync(async (req, res) => {
  const result = await carServices.createCarIntoDB(req.body as TCar)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Car create successfully!',
    data: result,
  })
})

const getAllCar = catchAsync(async (req, res) => {
  const result = await carServices.getAllCarFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cars retrieved successfully',
    data: result,
  })
})

const getSingleCar = catchAsync(async (req, res) => {
  const result = await carServices.getSingleCarFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'A Car retrieved successfully',
    data: result,
  })
})

const deleteCar = catchAsync(async (req, res) => {
  const result = await carServices.deleteCarFromDB(req.params.id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car deleted successfully',
    data: result,
  })
})

const updateCar = catchAsync(async (req, res) => {
    const result = await carServices.updateCarFromDB(req.params.id as string,req.body as TCar);
    sendResponse(res,{
        success: true,
        statusCode: httpStatus.OK,
        message: 'Car updated successfully successfully',
        data: result,
    })
})

export const carController = { createCar, getAllCar, getSingleCar,updateCar,deleteCar }
