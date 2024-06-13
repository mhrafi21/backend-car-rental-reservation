import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { courseSearchAbleFields } from './course.constant'
import { TCourse, TCourseFaculty } from './course.interface'
import { courseFacultyModel, courseModel } from './course.model'
import AppError from '../../errors/AppError'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await courseModel.create(payload)
  return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    courseModel.find({}).populate('preRequisiteCourse.course'),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  return result
}

const getSingleCourseFromDB = async (courseId: string) => {
  const result = await courseModel
    .findById(courseId)
    .populate('preRequisiteCourse.course')
  return result
}

// step1: basic course info update
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...courseRemainingData } = payload

  // start session
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // step: basic course info update

    const updateBasicCourseInfo = await courseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    )

    if (!updateBasicCourseInfo) {
      throw new AppError(500, 'Failed to update course')
    }

    // check if there is any preRequisite courses to update

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      // filter out deleted fields;

      const deletedPreRequisiteCourse = preRequisiteCourse
        .filter(el => el.course && el.isDeleted)
        .map(el => el.course)

      const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: {
              course: {
                $in: deletedPreRequisiteCourse,
              },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      )
      if (!deletedPreRequisiteCourses) {
        throw new AppError(500, 'Failed to delete course')
      }

      // filter out the new course fields
      const newPreRequisites = preRequisiteCourse?.filter(
        el => el.course && !el.isDeleted,
      )

      const newPreRequisiteCourses = await courseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPreRequisites } },
        },

        {
          new: true,
          runValidators: true,
          session,
        },
      )
      if (!newPreRequisiteCourses) {
        throw new AppError(500, 'Failed to update course')
      }

      const result = await courseModel
        .find({})
        .populate('preRequisiteCourse.course')

      return result
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(500, 'Failed to update course')
  }
}

const deleteCourseFromDB = async (courseId: string) => {
  const result = await courseModel.findByIdAndUpdate(
    courseId,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  )
  return result
}

const assignFacultiesIntoDB = async (
  courseId: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: {faculties: {$each: payload}}
    },
    {
      upsert: true,
      new: true,
      runValidators: true
    }
  )
  return result;
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  updateCourseIntoDB,
  assignFacultiesIntoDB,
  deleteCourseFromDB,
}
