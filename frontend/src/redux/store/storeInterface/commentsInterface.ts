
interface IComments {
	user: {
		_id: string
		name: string
		avatar?: string
	}
	comment: string
}

export interface ICommentsInitialState {
	comments:IComments[]
	status: string
	error: string
}

export interface ICommentsPayload {
	user: {
		_id: string
		name: string
		avatar?: string
	}
	comment: string
}
