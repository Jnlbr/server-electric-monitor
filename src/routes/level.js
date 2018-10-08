import express from 'express';
import { levelController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/create', verifyToken, levelController.create);

export default router;