import mongoose from 'mongoose'
import { User } from './userModel'

const Comment = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		require: true,
	},
	comment: {
		require: true,
		type: String,
	},
},{
	timestamps: true
})

export default mongoose.model('Comment', Comment)
