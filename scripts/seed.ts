import { PrismaClient } from '@prisma/client';

const database = new PrismaClient ();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Бағдарламашы" },
                { name: "Дизайнер" },
                { name: "Қаржы" },
                { name: "Маркетинг" },
                { name: "Тілдер ұйрену" },
                { name: "Басқалары" },
            ]
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();