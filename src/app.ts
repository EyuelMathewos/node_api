import express, { Request } from 'express';
import { NextFunction, Response } from 'express-serve-static-core';
import userRouter from './routes/userRouter';
import { compareHash, getUser } from './services/auth';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import  { PrismaClient } from '@prisma/client';
const pgSession = require('connect-pg-simple')(session);
const app = express();


const passport = require('passport');
const LocalStrategy = require('passport-local');


interface CustomRequest extends Request {
  session : any
}
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());
const options ={
  connectionLimit: 10,
  password: 'postgres',
  user: 'postgres',
  database: 'node_api',
  host: 'localhost',
  port: 5432,
  createTableIfMissing: true
}
const pgStore = new pgSession(options)

app.use(session({
  secret: 'process.env.SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge:2 * 60* 1000,

    secure: false },
  store:pgStore

  }));

app.use(passport.session());
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
     return cb(null, id);
   });
 });
 
 passport.deserializeUser(function(id: any, cb: any) {
   process.nextTick(function() {
     console.log("deserializer user trigered")
     return cb(null, id);
   });
 });


app.use(passport.authenticate('session'))
app.get("/", (req: CustomRequest, res) => { 
  res.send("Exporess is working"); 
});

app.use("/api/v1/user", userRouter);

module.exports = app;