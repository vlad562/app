import mongoose from 'mongoose'


const Schema = mongoose.Schema

export interface User {
  name: string
	email: string
	passwordHash: string
	avatar: string
}

interface UserDocument extends User, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  _doc?: any
}


const User = new Schema<UserDocument>({
	name: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
    unique: true
	},
	passwordHash: {
		type: String,
		require: true,
	},
  avatar: String

},{timestamps: true})


export default mongoose.model<UserDocument>("User", User)
