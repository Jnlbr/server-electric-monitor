import express from 'express';
import { authController } from '../controllers';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.get('/isAuth', authController.isAuth);
router.get('/logout', authController.logout);

export default router;