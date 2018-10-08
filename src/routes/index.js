import express from 'express';
import authRouter from './auth';
import registerRouter from './register';
import levelRouter from './level';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/register', registerRouter);
router.use('/level', levelRouter);

export default router;