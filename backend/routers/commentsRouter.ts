import express from 'express'
import { getComments } from '../controllers/commentsController.js'
import { authGetMe } from '../controllers/authController.js'
import checkAuth from '../utils/checkAuth.js'
import { commentCreateValidation, commentUpdateValidation } from '../validations/validation.js'

const commentsRouter = express.Router()

// commentsRouter.get('/all', commentsAll)
// commentsRouter.post('/create' ,checkAuth,commentCreateValidation, commentCreate)
// commentsRouter.put('/update/:id' ,checkAuth,commentUpdateValidation, commentUpdate)
commentsRouter.post('/create/:id',checkAuth,getComments)

export default commentsRouter
