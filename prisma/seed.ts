import {
    PrismaClient
} from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

    await prisma.user.createMany({
        data: [{
            "firstname": "hello",
            "lastname": "hello",
            "email": "hello@gmail.com",
            "social": [],
            "password": "$2a$10$l.a7M0BHXbveszXSRKedBeJZoA6F7IGbj7b1SEjD83.0BfRTjiM96",
            "isAdmin": false,
            "roleId": null
        }]
    })

    await prisma.userReset.createMany({
        data: [{
            "id": "99e56316-adf8-41ce-a800-8904abd175d1",
            "email": "hello@gmail.com"
        }]
    })

}

main().catch((error: Error) => {
    console.error(error)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})