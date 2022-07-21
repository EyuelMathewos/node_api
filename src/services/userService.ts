import { PrismaClient } from "@prisma/client";
const bcrypt = require('bcryptjs');
import { getUser } from "./auth";
import { createUserValidation, loginValidation } from "../validator/validator";

const prisma = new PrismaClient();

export const create = async (userData: any) => {
    return new Promise(resolve => {
        createUserValidation.validateAsync(userData, { abortEarly: false }).then(async () => {
            const result = await prisma.user.create({
                data: {
                    firstname: userData.firstName,
                    lastname: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                }
            })
            resolve({ status: 201, message: "user created successfully" });
        }).catch((validationError) => {
            const errorMessage = [];
            for (let i = 0; i < validationError.details.length; i++) {
                errorMessage[i] = validationError.details[i].message;
            }
            resolve({ status: 400, message: errorMessage });
        })
    })

}

export const login = async (email: string, password: string) => {
    return new Promise((resolve) => {
        loginValidation.validateAsync({ email, password }, { abortEarly: false }).then(async () => {

            const User: any = await getUser(email);
            const isPass = User.password != null ? bcrypt.compareSync(password, User.password) : false;
            resolve({ status: isPass, User });
        })
            .catch((validationError) => {
                const errorMessage = [];
                for (let i = 0; i < validationError.details.length; i++) {
                    errorMessage[i] = validationError.details[i].message;
                }
                resolve({ error: 400, message: errorMessage });
            })
    })
}
