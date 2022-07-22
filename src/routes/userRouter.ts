import express from 'express';
import { register, loginUser, forgotPassword, resetPassword, changePassword, logoutUser } from '../controllers/userController'



const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.post("/forgotpassword", forgotPassword);
router.post("/reset/:id", resetPassword);
router.post("/changepassword", changePassword);
router.post("/logout", logoutUser);
export default router;