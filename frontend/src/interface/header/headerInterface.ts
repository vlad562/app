import { IStyleMenuWithRegistration } from './stylesHeaderAuthMenu'

export interface IAuthMenu {
	title: string
	link: string
	style?: IStyleMenuWithRegistration
	event?: boolean
}
