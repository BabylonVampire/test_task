import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import userRouter from '../User/user.router.js';
import universityRouter from '../University/university.router.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/university', universityRouter);

// Валидация и санитизация данных для создания пользователя

export default router;
