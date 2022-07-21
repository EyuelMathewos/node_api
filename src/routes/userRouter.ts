import express, { Request, Response } from 'express';
import { register, loginUser } from '../controllers/userController'
import { compareHash, getUser } from '../services/auth';
const passport = require('passport');
const LocalStrategy = require('passport-local');
interface CustomRequest extends Request {
  session : any,
  user?: any
}


const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);

export default router;