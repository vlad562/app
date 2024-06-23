interface IUser {
  createdAt: string
  avatar?: string
  name: string
	_id: string
}

interface IComment {
	_id: string
	author: []
	comment: IUser
	__v: number
}

export interface IPosts {
	comments: []
	_id?: string 
	postId?: string | undefined
	title: string
	text: string
	tags: string[]
	viewCount: number
	user?: IUser
	imageUrl: string
	commentCount: number
	userId?: string | undefined
}
