import { Router } from 'express'
import { StudentRoutes } from '../modules/student/student.route'
import { userRouter } from '../modules/user/user.route'
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route'
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route'
import { AcademicDepartmentRoutes } from '../modules/academicDeparment/academicDepartment.route'
import { courseRoutes } from '../modules/course/course.route'
import { semesterRegistrationRoutes } from '../modules/academicRegistration/semesterRegistration.route'
import { authRoutes } from '../modules/Auth/auth.route'
import { AdminRoutes } from '../modules/Admin/admin.route'

const router = Router()

const moduleRoutes = [
  { path: '/students', route: StudentRoutes },
  { path: '/users', route: userRouter },
  { path: '/academic-semester', route: AcademicSemesterRoutes },
  { path: '/academic-semester', route: AcademicSemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
  { path: '/academic-departments', route: AcademicDepartmentRoutes },
  { path: '/courses', route: courseRoutes },
  { path: '/semester-registration', route: semesterRegistrationRoutes },
  { path: '/auth', route: authRoutes },
  { path: '/admins', route: AdminRoutes },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;

