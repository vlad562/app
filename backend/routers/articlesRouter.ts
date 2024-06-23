import express from 'express'
import {
	postArticles,
	getArticles,
	putArticles,
	deleteArticles,
	getOneArticles,
	getCommentsArticles,
} from '../controllers/articlesController.js'
import checkAuth from '../utils/checkAuth.js'
import { postCreateValidation } from '../validations/validation.js'

const articlesRouter = express.Router()

articlesRouter.get('/all',getArticles)
articlesRouter.get('/one/:id', checkAuth, getOneArticles)
articlesRouter.post('/create', checkAuth, postCreateValidation, postArticles)
articlesRouter.put('/update/:id', checkAuth, putArticles)
articlesRouter.delete('/remove/:id', checkAuth, deleteArticles)
articlesRouter.get('/getComments/:id', checkAuth, getCommentsArticles)

export default articlesRouter

