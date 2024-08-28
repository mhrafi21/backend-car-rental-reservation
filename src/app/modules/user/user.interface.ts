import { USER_ROLE } from './user.constant'

export type TUser = {
  name: string
  email: string
  role: 'user' | 'admin'
  password: string,
  confirmPassword: string;
  terms: boolean;
}

export type TUserRole = keyof typeof USER_ROLE
