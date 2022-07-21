import express, {
  Request
} from 'express';
import userRouter from './routes/userRouter';
const app = express();
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local');

interface CustomRequest extends Request {
  session: any
}
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(passport.initialize());
const options = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createTableIfMissing: true
}
const pgStore = new pgSession(options)

app.use(session({
  secret: 'process.env.SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 1000,
    secure: false
  },
  store: pgStore

}));

app.use(passport.session());
passport.use(new LocalStrategy(
  async function(username: any, password: any, done: any) {
     const user = {id: 1};
        done(null,  user);
   }
 ));
 
 passport.serializeUser(function(id: any, cb: any) {
   process.nextTick(function() {
     return cb(null, id);
   });
 });
 
 passport.deserializeUser(function(id: any, cb: any) {
   process.nextTick(function() {
     return cb(null, id);
   });
 });


app.use(passport.authenticate('session'))
app.get("/", (req, res) => { 
  res.send("Exporess is working"); 
});

app.use("/api/v1/user", userRouter);

module.exports = app;