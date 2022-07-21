import express, { Request, Response } from 'express';
import { generateHash } from '../services/auth';
import { create, login } from '../services/userService'

interface CustomRequest extends Request {
    session?: any
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
    const user: any = await create(userData);
    if (user.status == 201) {
        res.status(201).json({ status: "user registered successfully" });
    }
    else {
        res.status(201).json({ status: user });
    }
};

export const loginUser = async (req: CustomRequest, res: Response) => {
    const { email, password } = req.body;
    const response: any = await login(email, password);
    const isMatch = response.status;
    const user = response.User;
    if (isMatch == true) {
        const data = {
            clientId: user.id,
            role: user.roleId
        };
        req.session.isAuth = data
        res.status(201).json({ status: "user logged in successfully" });
    }
    else if (user == "") {
        res.status(404).json({ status: "The email you entered does not exist" });
    }
    else if (isMatch == false) {
        res.status(404).json({ status: "Incorrect password" });
    }
    else {
        res.status(401).json({ message: response.message });
    }


};

