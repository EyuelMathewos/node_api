import express, { Request } from 'express';
import { NextFunction, Response } from 'express-serve-static-core';
import userRouter from './routes/userRouter';
const app = express();
const session = require('express-session')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

interface CustomRequest extends Request {
  session?: any
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true },
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

function isAuth(req: CustomRequest, res: Response, next: NextFunction) {
  const loggedinUser = req.session.isAuth;
  // console.log(loggedinUser);
  next()
}

app.use(isAuth);
app.get("/", (req: CustomRequest, res) => {
  res.send("Exporess is working");
});

app.use("/api/v1/user", userRouter);

module.exports = app;