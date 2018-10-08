import express from 'express';
import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get', verifyToken, deviceController.get);

export default router;