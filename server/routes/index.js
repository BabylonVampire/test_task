import { Router } from 'express';
import userRouter from '../User/user.router.js';
import universityRouter from '../University/university.router.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/university', universityRouter);

export default router;
