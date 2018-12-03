import express from 'express';
import { hardwareController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/params/add', hardwareController.addParams);
router.put('/update/status', verifyToken, hardwareController.updateStatus);
router.get('/params/get/month/:id', hardwareController.getMonths);
router.get('/params/getAll/month', verifyToken, hardwareController.getAllMonths);
router.get('/params/get/:id/:year/:month', verifyToken, hardwareController.getByMonth);
router.get('/params/getAll/:year/:month', verifyToken, hardwareController.getAllByMonth);

export default router;