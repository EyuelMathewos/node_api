import express, { Request } from 'express';
import { NextFunction, Response } from 'express-serve-static-core';
import userRouter from './routes/userRouter';
import { compareHash, getUser } from './services/auth';
// import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';
const app = express();
const session = require('express-session');
// const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
// const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const LocalStrategy = require('passport-local');


interface CustomRequest extends Request {
  session : any
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
// app.use(passport.session());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000  },
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
})
);

// app.use(passport.authenticate('session'));
passport.use(new LocalStrategy(
  async function(username: any, password: any, done: any) {
    console.log(`username${username} password${password}`)
     const res:any = await getUser(username);
     const user = {id: 1};
        done(null,  user);
   }
 ));
 
 passport.serializeUser(function(id: any, cb: any) {
   process.nextTick(function() {
     console.log("serilizer user trigered")
     console.log(id)
     return cb(null, { id: id, username: id });
   });
 });
 
 passport.deserializeUser(function(id: any, cb: any) {
   process.nextTick(function() {
     console.log("deserializer user trigered")
     return cb(null, id);
   });
 });

// app.use(passport.initialize());
// app.use(passport.session());
// app.use(passport.authenticate('session'));
// app.use(passport.authenticate('session'));
function isAuth (req: CustomRequest, res: Response, next: NextFunction) {
    //const loggedinUser = req.session.isAuth;
   // console.log(loggedinUser);
    next()
}
app.use(passport.authenticate('session'))
app.use(isAuth);
app.get("/", (req: CustomRequest, res) => { 
  res.send("Exporess is working"); 
});

app.use("/api/v1/user", userRouter);

module.exports = app;