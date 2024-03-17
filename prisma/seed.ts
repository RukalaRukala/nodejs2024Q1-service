import {PrismaClient} from '@prisma/client';
import {v4 as uuidv4} from "uuid";

// initialize Prisma Client
export const prisma = new PrismaClient();

async function main() {
    // create user
    await prisma.user.upsert({
            where: {login: 'Rukala'},
            update: {},
            create: {
                id: uuidv4(),
                login: 'Rukala',
                password: '12345',
                version: 1,
            }
        }
    );

    const existingFavorites = await prisma.favorites.findFirst();

    if (!existingFavorites) {
        await prisma.favorites.create({
            data: {
                id: uuidv4(),
                artists: { create: [] },
                albums: { create: [] },
                tracks: { create: [] }
            }
        });
    }
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
