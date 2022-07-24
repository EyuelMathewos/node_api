import {PrismaClient } from "@prisma/client";
const bcrypt = require('bcryptjs');
import { generateHash, getUser } from "./auth";
import { createUserValidation, loginValidation, forgotValidation, resetValidation } from "../validator/validator";
import { mail } from "./mail";
import { rejected } from "hamjest";


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
    return new Promise((resolve, reject) => {
        loginValidation.validateAsync({
                email,
                password
            }, {
                abortEarly: false
            }).then(async () => {
                console.log("this code is running")
                const User: any = await getUser(email).catch((error)=>{
                    reject({
                        message: 'The email you entered does not exist',
                    });
                });
                console.log(User)
                const isMatch = User?.password != null ? bcrypt.compareSync(password, User.password) : false;
                console.log(isMatch)
                resolve({
                    message: 'user logged in successfully',
                    isMatch,
                    Data: User
                });
            })
            .catch((error: any) => {
                reject({
                    message: error.message
                });
            })
    })
}

export async function forgotSercice(email: string, task = "defaultMessage") {
    return new Promise(async (resolve, reject) => {
        forgotValidation.validateAsync({email}).catch((error: any) => {
            reject({
                message: error.message
            });
        })
            const user = await getUser(email).then(async (res) => {
                const response = await prisma.userReset.create({
                    data: {
                        email,
                    }
                }).catch((error) => {
                    console.log(error)
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
                ).catch((error)=>{
                    reject({
                        message: "mailer service is not currently working"
                    })
                })
                resolve(response);
            }).catch((error) => {
                reject(error);
            });

    });
}

export async function resetService(id: string, password: string, confirmpassword: string) {
    return new Promise(async (resolve, reject) => {
        
        const userReset = await prisma.userReset.findUnique({
            where: {
                id,
            }
        }).catch((error)=>{
            reject(error)
         });
         console.log("error",`${userReset != null} && ${password == confirmpassword}`);
         console.log(password, confirmpassword)
        if ( userReset != null && password == confirmpassword ) {

            const resetval = await resetValidation.validateAsync({password, confirmpassword}).catch((error: any) => {
            reject({
                message: error.message
            });
        })
            const email: string = userReset?.email || "";
            
            if (resetval != null && email!= null) {
                const user: any = await getUser(email).catch((error)=>{
                    console.log(error)
                 });
                // const email = user.email;
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
        }
         else if( userReset == null) {
            reject({
                message: 'make sure the reset link is correct'
            })
        } else if( password != confirmpassword ){
            reject({
                message: 'You entered different Password on password confirmation'
            })
        }
    })
}