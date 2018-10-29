import express from 'express';
import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get/all', verifyToken, deviceController.getAll);
router.get('/get/preference/:deviceId', verifyToken, deviceController.getPreference);
router.put('/set/preference', verifyToken, deviceController.setPreference);

export default router;