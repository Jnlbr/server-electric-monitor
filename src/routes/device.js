import express from 'express';
import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get/all', verifyToken, deviceController.getAll);
router.get('/get/preference/:deviceId', verifyToken, deviceController.getPreference);
router.put('/update/preference', verifyToken, deviceController.setPreference);
router.put('/update/name', verifyToken, deviceController.updateName);

export default router;