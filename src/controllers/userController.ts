import express, { Request, Response } from 'express';
import { generateHash } from '../services/auth';
import { create } from '../services/userService'
const passport = require('passport');
interface CustomRequest extends Request {
    session : any
  }

export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;
    const hash = await generateHash(password);
    const userData = {
        firstName,
        lastName,
        email,
        password: hash,
    };
    const user = await create(userData);
    res.status(201).json({ status: "user registered successfully", data: user });
};



