import express, { Request } from 'express';
const app = express();
const session = require('express-session')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

interface CustomRequest extends Request {
  session ? : any
}
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'thisismysecretkey',
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

app.get("/", (req: CustomRequest, res) => { 
  res.send("Exporess is working"); 
});

module.exports = app;