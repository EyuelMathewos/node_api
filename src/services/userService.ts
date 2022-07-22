import {PrismaClient } from "@prisma/client";
const bcrypt = require('bcryptjs');
import { generateHash, getUser } from "./auth";
import { createUserValidation, loginValidation } from "../validator/validator";
import { mail } from "./mail";


const prisma = new PrismaClient();

export const create = async (userData: any) => {
    return new Promise(resolve => {
        createUserValidation.validateAsync(userData, {
            abortEarly: false
        }).then(async () => {
            const result = await prisma.user.create({
                data: {
                    firstname: userData.firstName,
                    lastname: userData.lastName,
                    email: userData.email,
                    password: userData.password,
                }
            })
            resolve({
                status: 201,
                message: "user created successfully"
            });
        }).catch((validationError: any) => {
            const errorMessage = [];
            for (let i = 0; i < validationError.details.length; i++) {
                errorMessage[i] = validationError.details[i].message;
            }
            resolve({
                status: 400,
                message: errorMessage
            });
        })
    })

}

export const login = async (email: string, password: string) => {
    return new Promise((resolve) => {
        loginValidation.validateAsync({
                email,
                password
            }, {
                abortEarly: false
            }).then(async () => {

                const User: any = await getUser(email);
                const isPass = User.password != null ? bcrypt.compareSync(password, User.password) : false;
                resolve({
                    status: isPass,
                    User
                });
            })
            .catch((validationError: any) => {
                const errorMessage = [];
                for (let i = 0; i < validationError.details.length; i++) {
                    errorMessage[i] = validationError.details[i].message;
                }
                resolve({
                    error: 400,
                    message: errorMessage
                });
            })
    })
}

export async function forgotSercice(email: string, task = "defaultMessage") {
    return new Promise(async (resolve, reject) => {
        const user = await getUser(email).then(async (res) => {
            const response = await prisma.userReset.create({
                data: {
                    email,
                }
            }).catch((error) => {
                reject(error);
            })
            const message = {
                defaultMessage: "don't respond to this email if you did't request for account reset.",
                SecurityIssue: "your are require to change your password there is security issue you are advised to change your password"
            }
            await mail(
                email, // list of receivers
                "reset your password", // Subject line
                `<a href="http://localhost:3000/api/v1/user/reset/${response?.id}">http://localhost:3000/api/v1/user/reset/${response?.id}</a>
                ${task == "SecurityIssue" ? message.SecurityIssue : message.defaultMessage }
                `,
            )
            resolve(response);
        }).catch((error) => {
            reject(error);
        });

    });
}

export async function resetService(id: string, password: string, confirmpassword: string) {
    return new Promise(async (resolve, reject) => {
        if (password == confirmpassword) {
            const userReset = await prisma.userReset.findUnique({
                where: {
                    id,
                }
            })
            const email: string = userReset?.email || "";
            const user: any = await getUser(email);
            if (user.email == email) {
                const email = user.email;
                const userId = user.id;
                let hash;
                await generateHash(password).then((response) => {
                    hash = response;
                });
                await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        password: hash
                    },
                })
                resolve({
                    message: 'user password successfully changed'
                })
            }
        } else {
            reject({
                message: "you entered different password on confirmation password"
            })
        }
    })
}