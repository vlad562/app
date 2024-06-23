import express from 'express';
import { tagsAll } from '../controllers/tagsController.js';
const tagsRouter = express.Router();
tagsRouter.get('/all', tagsAll);
export default tagsRouter;
