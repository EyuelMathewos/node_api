import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();

export const create = async (userData: any) => {
    const result = await prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
        }
    })
    return result;
}