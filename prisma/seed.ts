import {PrismaClient} from '@prisma/client';
import {v4 as uuidv4} from "uuid";
import {db} from "../src/dataBase/db";

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create user
    const user = await prisma.user.create({
            data: {
                id: uuidv4(),
                login: 'Rukala',
                password: '12345',
                version: 1,
            }
        }
    );
    const userFromDB = await prisma.user.findMany();

    console.log({user, userFromDB}, '\n', db);
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
