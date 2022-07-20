import express, { Request, Response } from 'express';
import { generateHash } from '../services/auth';
import { create, login } from '../services/userService'

interface CustomRequest extends Request {
    session ? : any
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

export const loginUser = async (req: CustomRequest, res: Response) => {
    const { email, password } = req.body;
    const response = await login( email, password );
    const isMatch = response.status;
    const user = response.User;
    if(isMatch){
        const data = {
            clientId: user.id,
            role: user.roleId
        };
        req.session.isAuth = data
        res.status(201).json({ status: "user loggedin successfully", data: user });
    } else {
        res.status(401).json({message: "Incorrect Password or Account Name"})
    }

    
};

