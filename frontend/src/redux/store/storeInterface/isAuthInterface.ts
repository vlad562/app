export interface IAuthInitialState {
	isAuth: {
		_id: string
		name: string
		email: string
		avatar?: string
		token: string
	} | null
	status: string
	error: string
}
