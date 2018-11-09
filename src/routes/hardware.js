import express from 'express';
import { hardwareController } from '../controllers';

const router = express.Router();

router.post('/params/add', hardwareController.addParams);
router.put('/update/status', hardwareController.updateStatus);

export default router;