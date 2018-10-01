import express from 'express';
import authRouter from './auth';
import registerRouter from './register';
import devicesRouter from './devices';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/register', registerRouter);
router.use('/devices', devicesRouter);

export default router;