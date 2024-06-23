import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/authRouter.js';
import articlesRouter from './routers/articlesRouter.js';
import multer from 'multer';
import checkAuth from './utils/checkAuth.js';
import cors from 'cors';
import tagsRouter from './routers/tagsRouter.js';
import commentsRouter from './routers/commentsRouter.js';
const app = express();
await mongoose.connect('mongodb://127.0.0.1:27017/admin');
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'dist/uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res
        .header("Access-Control-Allow-Origin", "*")
        .status(200)
        .json({
        url: `/dist/uploads/${req.file?.originalname}`
    });
});
app.get('/assets/:file', (req, res) => {
    res.sendFile(`C:/Users/vladk/OneDrive/Рабочий стол/test application/frontend/src/${req.url}`);
});
app.use(express.json());
app.use(cors());
app.use('/dist/uploads', express.static('dist/uploads'));
app.use('/auth', userRouter);
app.use('/article', articlesRouter);
app.use('/tags', tagsRouter);
app.use('/comments', commentsRouter);
app.listen(3001, () => {
    console.log('Сервер запущен');
});
// import { registerValidation } from './validations/validation.js'
// import { authRegister } from './controllers/authController.js'
// import { validationResult } from 'express-validator'
// import UserModel from './models/userModel.js'
// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import checkAuth from './utils/checkAuth.js'
