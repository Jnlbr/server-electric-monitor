import express from 'express';
import { devicesController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/level/create', verifyToken, devicesController.createLevel);

export default router;