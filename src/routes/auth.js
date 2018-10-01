import express from 'express';
import { authController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/isAuth', verifyToken);

export default router;