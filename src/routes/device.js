import express from 'express';
import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/get/all', verifyToken, deviceController.getAll);
router.put('/update/data', verifyToken, deviceController.updateData);
router.delete('/delete', verifyToken, deviceController.deleteDevice);


export default router;