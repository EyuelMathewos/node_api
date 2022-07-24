import express, { Request, response, Response } from 'express';
import { generateHash } from '../services/auth';
import {
    resetService,
    create,
    forgotSercice,
    login
} from '../services/userService'



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
    const user: any = await create(userData).then(()=>{
        res.status(201).json({
            status: "user registered successfully"
        });
    });
};

export const loginUser = async (req: any, res: Response) => {
    const {
        username,
        password
    } = req.body;
    const response: any = await login(username, password).then((response: any)=>{
        const isMatch = response.isMatch;
        if (isMatch == true) {
            const user = {
                id: response.Data.id
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
            }
        } else if (isMatch == false) {
            res.status(401).json({
                message: "Incorrect password"
            });
        }
    })
    .catch((error)=>{
        console.log(error)
        res.status(401).send(error);
    });



};
export const logoutUser = async (req: any, res: Response) => {
    if (req.isAuthenticated()) {
        req.logout(function (err: any) {
            if (err) {
                res.status(401).send(err)
            } else {
                res.send({
                    message: "user successfully logged out"
                })
            }

        });
    } else {
        res.send({
            message: "user not authenticated"
        })
    }
}
export async function forgotPassword(req: any, res: Response) {
    const { email } = req.body;
    await forgotSercice(email).then((response: any) => {
        res.send({
            message: `check your email '${email}' address to reset you password`
        })
    }).catch((error) => {
        res.status(404).send(error)
    });
}

export const resetPassword = async (req: any, res: Response) => {
    const { id } = req.params;
    const { password, confirmpassword } = req.body;
    await resetService(id, password, confirmpassword).then((response) => {
        res.send(response);
    }).catch((error) => {
        res.status(400).send(error);
    })

}
export const changePassword = async (req: any, res: Response) => {
    const {
        email
    } = req.body;
    await forgotSercice(email, "SecurityIssue").then((response) => {
        res.send({
            message: `reset email sent to this '${email}' email address`
        })
    }).catch((error) => {
        res.status(404).send(error)
    });
}