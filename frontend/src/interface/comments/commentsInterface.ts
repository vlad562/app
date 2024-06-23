export interface IComments {
	comments: IComment[]
}

interface IComment {
	_id: string
	createdAt: Date
	comment: string
	author: {
		name: string
		avatar?: string
	}
}
