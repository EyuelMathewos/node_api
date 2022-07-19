import { PrismaClient } from "@prisma/client"


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