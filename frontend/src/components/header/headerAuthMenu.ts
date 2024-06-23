import { IAuthMenu } from '../../interface/header/headerInterface'

export const menuWithRegistration: IAuthMenu[] = [
	{
		title: 'Войти',
		link: '/login',
	},
	{
		title: 'Создать аккаунт',
		link: '/register',
	},
]

export const menuWithoutRegistration: IAuthMenu[] = [
	{
		title: 'Написать статью',
		link: '/add-post',
		style: {
			backgroundColor: '#251e91',
			color: '#fff',
		},
	},
	{
		title: 'Выйти',
		link: '/login',
		style: {
			backgroundColor: 'red',
			color: '#fff',
		},
		event: true
	},
]
