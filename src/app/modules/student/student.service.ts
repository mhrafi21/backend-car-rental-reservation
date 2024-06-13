import QueryBuilder from '../../builder/QueryBuilder'
import { studentsSearchAbleFields } from './student.const'
import { Student } from './student.interface'
import { StudentModel } from './student.model'

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student)
  return result
}

const getStudentsIntoDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query } // copy object

  // // searching partial matching
  // // {email: {$regex: query.searchTerm, $option: "i"}}

  // const studentsSearchAbleFields = ['email', 'name.firstName', 'presentAddress']

  // //filtering

  // const excludes = ['searchTerm', 'sort', 'limit', 'page', 'fields']
  // // delete
  // excludes.forEach(el => delete queryObj[el])

  // let searchTerm = ''

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string
  // }

  // // first phase
  // const searchQuery = StudentModel.find({
  //   $or: studentsSearchAbleFields.map(field => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // })

  // // second match
  // const filterQuery = searchQuery.find(queryObj).populate('admissionSemester')

  // let sortItem = '-createdAt'

  // if (query.sort) {
  //   sortItem = query.sort as string
  // }

  // const sortQuery = filterQuery.sort(sortItem)

  // let limit = 1
  // let page = 1
  // let skip = 0

  // if (query.limit) {
  //   limit = Number(query.limit)
  // }

  // if (query.page) {
  //   page = Number(query.page)
  //   skip = (page - 1) * page
  // }

  // const paginationQuery = sortQuery.skip(skip)

  // const limitQuery =  paginationQuery.limit(limit);

  // // field limiting

  // let fields = "-__v"

  // if(query.fields){
  //   fields = (query.fields as string).split(",").join(" ")
  // }

  // const fieldQuery = await limitQuery.select(fields)

  // return fieldQuery

  const studentQuery = new QueryBuilder(StudentModel.find(), query)
    .search(studentsSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery

  return result
}

export { createStudentIntoDB, getStudentsIntoDB }
