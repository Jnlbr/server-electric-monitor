import express from 'express';
// import { deviceController } from '../controllers';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.post('/param', (req,res) => {
  console.log(req.body);
})

export default router;