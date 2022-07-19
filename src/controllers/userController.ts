import express, { Request, Response } from 'express';
import { create } from '../services/userService'

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

