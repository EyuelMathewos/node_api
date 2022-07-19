import express, { Request, Response } from 'express';
import { create, login } from '../services/userService'

export const register = async (req: Request, res: Response) => {
    const { body } = req;
    const userData = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
    };
    const user = await create(userData);
    res.status(201).json({ status: "user registered successfully", data: user });
};

export const loginUser = async (req: Request, res: Response) => {
    const { body } = req;
    const user = await login(body.email, body.password);
    res.status(201).json({ status: "user loggedin successfully", data: user });
};

