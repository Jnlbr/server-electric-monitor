import express from 'express';
import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get/all', verifyToken, deviceController.getAll);
router.put('/update/data', verifyToken, deviceController.updateData);
router.get('/param/get/:id/:from', deviceController.getParams);
router.get('/param/getAll/:from', deviceController.getAllParams);
router.delete('/delete', verifyToken, deviceController.deleteDevice);


export default router;