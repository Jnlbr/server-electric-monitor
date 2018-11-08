import express from 'express';
import authRouter from './auth';
import registerRouter from './register';
import levelRouter from './level';
import deviceRouter from './device';
import hardwareRouter from './hardware';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/register', registerRouter);
router.use('/level', levelRouter);
router.use('/device', deviceRouter);
router.use('/hardware', hardwareRouter);

export default router;