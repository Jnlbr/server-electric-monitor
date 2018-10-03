import express from 'express';
import { registerController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/user', verifyToken, registerController.userRegister);
router.post('/device', registerController.deviceRegister);
router.put('/token', verifyToken, registerController.tokenRegister);

export default router;