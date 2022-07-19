import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();

export const create = async (userData: any) => {
    const result = await prisma.user.create({
        data: {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName
        }
    })
    return result;
}