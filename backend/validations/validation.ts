import { body } from 'express-validator'

export const registerValidation = [
	body('name', 'неверное имя').isLength({min: 2}),
	body('email', 'неверная почта').isEmail(),
	body('password', 'неверный пароль').isLength({ min: 3 }),
	body('avatar','аватарка не является URL').optional().isURL(),
]

export const loginValidation = [
	body('email', 'неверная почта').isEmail(),
	body('password', 'неверный пароль').isLength({ min: 3 }),
]

export const postCreateValidation = [
	body('title', 'неверная title').isLength({min: 1}).isString(),
	body('text', 'неверный text').isLength({ min: 3 }).isString(),
	body('tags', 'неверный tags').isLength({ min: 3 }).isString(),
	body('imageUrl', 'неверный URL').optional().isString(),
	body('comments', 'неверные комментарии').isArray()
]

export const commentCreateValidation = [
	body('comment', 'Неверный комментарий').isLength({min: 1}).isString()
]

export const commentUpdateValidation = [
	body('comment', 'Неверный комментарий').isLength({min: 1}).isString()
]

