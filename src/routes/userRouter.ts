import express from 'express';
import { register, loginUser } from '../controllers/userController'



const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);

export default router;