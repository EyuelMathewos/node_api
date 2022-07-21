import { PrismaClient } from "@prisma/client";
const bcrypt =  require('bcryptjs');
import { compareHash, getUser } from "./auth";


const prisma = new PrismaClient();

export const create = async (userData: any) => {
    const result = await prisma.user.create({
        data: {
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            password: userData.password,
        }
    })
    return result;
}

export const login = async (email: string, password: string) => {
    const User:any = await getUser(email);
    console.log(User)
    const isPass = User.password != null ? bcrypt.compareSync(password, User.password) : false;
    console.log({status: isPass, User})
    return {status: isPass, User};
}
