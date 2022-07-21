import express, {
  Request,
  Response
} from 'express';
import {
  generateHash
} from '../services/auth';
import {
  create,
  login
} from '../services/userService'
const passport = require('passport');
interface CustomRequest extends Request {
  isAuthenticated: any,
  isUnauthenticated: any,
  login: any,
  user: any,
  session: any
}

export const register = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;
  const hash = await generateHash(password);
  const userData = {
    firstName,
    lastName,
    email,
    password: hash,
  };
  const user = await create(userData);
  res.status(201).json({
    status: "user registered successfully",
    data: user
  });
};


export const loginUser = async (req: any, res: Response) => {
  const {
    username,
    password
  } = req.body;
  const response = await login(username, password);
  const isMatch = response.status;
  const user = {
    id: response.User.id
  }
  if (req.isAuthenticated()) {
    res.status(200).send({
      message: 'user logged in'
    })
  } else {
    if (req.isUnauthenticated() && isMatch) {
      req.login(user, function () {
        if (req.isAuthenticated()) {
          res.status(200).send({
            message: 'user successfully logged in'
          })
        } else {
          res.status(404).send({
            message: 'account information incorrect'
          })
        }
      })
    }
     else {
      res.status(401).json({
        message: "Incorrect Password or Account Name"
      })
    }
  }


};