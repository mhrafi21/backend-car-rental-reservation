import { createStudentIntoDB, getStudentsIntoDB } from './student.service'
import catchAsync from '../../utils/catchAsync'

// higher order function for async

const createStudent = catchAsync(async (req, res, next) => {
  const result = await createStudentIntoDB(req.body)
  res.status(200).json({
    success: true,
    message: 'Data Inserted Successfully!',
    data: result,
  })
})

const getStudents = catchAsync(async (req, res, next) => {
  const result = await getStudentsIntoDB(req.query)
  res.status(200).json({
    success: true,
    message: 'Data retrieve Successfully!',
    data: result,
  })
})

export { createStudent, getStudents }
