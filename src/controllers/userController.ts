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

interface CustomRequest extends Request {
    isAuthenticated: any;
    isUnauthenticated: any;
    login: any;
    session ? : any;
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
    const user: any = await create(userData);
    if (user.status == 201) {
        res.status(201).json({
            status: "user registered successfully"
        });
    } else {
        res.status(201).json({
            status: user
        });
    }
};

export const loginUser = async (req: any, res: Response) => {
    const {
        username,
        password
    } = req.body;
    const response: any = await login(username, password);
    const isMatch = response.status;
    const user = response.User;
    if (isMatch == true) {
        const user = {
            id: response.User.id
        }
        if (req.isAuthenticated()) {
            res.status(200).send({
                message: 'user logged in'
            })
        } else if (req.isUnauthenticated()) {
            req.login(user, function () {
                if (req.isAuthenticated()) {
                    res.status(200).send({
                        message: 'user logged in successfully'
                    })
                } else {
                    res.status(404).send({
                        message: 'account information incorrect'
                    })
                }
            })
        } else {
            res.status(401).json({
                message: "Incorrect Password or Account Name"
            })
        }

    } else if (user == "") {
        res.status(404).json({
            status: "The email you entered does not exist"
        });
    } else if (isMatch == false) {
        res.status(404).json({
            status: "Incorrect password"
        });
    } else {
        res.status(401).json({
            message: response.message
        });
    }


};