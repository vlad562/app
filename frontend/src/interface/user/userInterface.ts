// export interface IPost {
// 	title: string
//   text: string
//   tags: string[]
//   viewCount: number
//   user: string,
//   imageUrl: String,
// 	timestamps: {
//     createdAt: string
//     updatedAt: string
//   }
// }

// export interface IUser {
// 	_id: string
//   name: string
//   email: string
//   createdAt: Date
//   updatedAt: Date
//   __v: number
// }

export interface IUser {
  avatar?: string
  name: string
  createdAt?: string
  comment?: string
}

// export interface IUser {
//   _id: string
//   email: string
//   passwordHash: string
//   createdAt: string
//   avatar?: string
//   name: string
//   updateAt: string
//   __v: number
// }