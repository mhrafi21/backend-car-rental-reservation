import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { carController } from './car.controller'
import { carValidation } from './car.validation'

const router = express.Router()

router.post('/', validateRequest(carValidation.carValidationSchema), carController.createCar);

router.get('/', carController.getAllCar);

router.get('/:id', carController.getSingleCar);

router.put("/:id", carController.updateCar)

router.delete("/:id", carController.deleteCar)

export const carRoutes = router;
