import { Model } from 'mongoose'

// export type TUser = {
//   id: string
//   password: string
//   needsPasswordChange: string
//   role: 'admin' | 'student' | 'faculty'
//   status: 'in-progress' | 'blocked'
//   isDeleted: boolean
// }

// export type NewUser = {
//   password: string
//   role: string
//   id: string
// }

// export interface UserModel extends Model<TUser> {
//   //myStaticMethod(): number;
//   isUserExistsByCustomId(id: string): Promise<TUser>,
//   isPasswordMatched(password: string) : Promise<boolean>

// }

export type TUser = {
  name: string
  email: string
  role: 'user' | 'admin'
  password: string
  phone: number
  address: string
}


