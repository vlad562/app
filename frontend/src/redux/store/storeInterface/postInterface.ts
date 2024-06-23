import { IPosts } from '../../../interface/post/postInterface'

export interface IPostInitialState {
	posts: IPosts[]
	status: string
	error: string
}
