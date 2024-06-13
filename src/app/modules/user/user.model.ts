import { Schema, model } from 'mongoose'
import { TUser } from './user.interface'

// const userSchema = new Schema<TUser, UserModel>(
//   {
//     id: { type: String, required: true },
//     password: { type: String, required: true },
//     needsPasswordChange: { type: String },
//     role: {
//       type: String,
//       enum: ['student', 'faculty', 'admin'],
//     },
//     status: {
//       type: String,
//       enum: ['in-progress', 'blocked'],
//       default: 'in-progress',
//     },

//     isDeleted: { type: Boolean, default: false },
//   },
//   { timestamps: true },
// )

// userSchema.statics.isUserExistsByCustomId = async function(id: string) {
//   return await User.findOne({id})

// }

// userSchema.statics.isPasswordMatched = async function(password: string) {
//   return User.findOne({password })
// }

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin'],
    },
    address: { type: String, required: true },
  },
  { timestamps: true },
)

export const User = model<TUser>('User', userSchema)
