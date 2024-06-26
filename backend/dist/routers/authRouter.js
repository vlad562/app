import express from 'express';
import { authRegister, authLogin, authGetMe, } from '../controllers/authController.js';
import { registerValidation, loginValidation, } from '../validations/validation.js';
import checkAuth from '../utils/checkAuth.js';
import handleValidationError from '../validations/handleValidationError.js';
const userRouter = express.Router();
userRouter.post('/login', loginValidation, handleValidationError, authLogin);
userRouter.post('/register', registerValidation, handleValidationError, authRegister);
userRouter.get('/me', checkAuth, authGetMe);
export default userRouter;
