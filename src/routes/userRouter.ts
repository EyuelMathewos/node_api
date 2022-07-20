import express, { Request, Response } from 'express';
import { register } from '../controllers/userController'
import { compareHash, getUser } from '../services/auth';
const passport = require('passport');
const LocalStrategy = require('passport-local');
interface CustomRequest extends Request {
  session : any,
  user?: any
}

// passport.use(new LocalStrategy(async function verify(username: string, password: string, cb:any) {
//   const User:any = await getUser(username);
  //console.log(User)
  //const isMatch = await compareHash(password, User.password)
 
  // console.log("passport js auth iner")
  //console.log(isMatch)
  
//   return cb(null, true);
// }));

const router = express.Router();

router.post("/register", register);
router.post("/login", passport.authenticate('local'), function(req: CustomRequest, res: any, ) {
    console.log(res)
    res.status(200).send({'Hello':"world"})
});

export default router;