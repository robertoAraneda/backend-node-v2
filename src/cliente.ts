import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    /*
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',
            password: 'password'
        },
    })

    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })

     */
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

export default prisma;
