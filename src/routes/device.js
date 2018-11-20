import express from 'express';
import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get/all', verifyToken, deviceController.getAll);
router.get('/get/preference/:deviceId', verifyToken, deviceController.getPreference);
router.put('/update/preference', verifyToken, deviceController.setPreference);
router.put('/update/name', verifyToken, deviceController.updateName);
router.get('/param/get/:id/:from', deviceController.getParams);
router.get('/param/getAll/:from', deviceController.getAllParams);

export default router;