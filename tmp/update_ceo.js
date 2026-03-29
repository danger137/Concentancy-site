const { PrismaClient } = require('../src/lib/generated/client_new');
const prisma = new PrismaClient();

async function updateCeo() {
    // We try to find Khurram Hashmi and set isCeo to true
    // Even if the client isn't regenerated yet, the database might have the column
    // if `db push` partially worked or if we use raw sql.

    try {
        await prisma.$executeRawUnsafe(`ALTER TABLE "TeamMember" ADD COLUMN IF NOT EXISTS "isCeo" BOOLEAN DEFAULT false;`);

        const hashmi = await prisma.teamMember.findFirst({
            where: {
                name: {
                    contains: 'Khurram',
                    mode: 'insensitive'
                }
            }
        });

        if (hashmi) {
            await prisma.$executeRawUnsafe(`UPDATE "TeamMember" SET "isCeo" = true WHERE id = '${hashmi.id}';`);
            console.log(`Successfully set ${hashmi.name} as CEO.`);
        } else {
            console.log("Khurram Hashmi not found. Creating new CEO entry...");
            await prisma.teamMember.create({
                data: {
                    name: "Khurram Hashmi",
                    role: "Founder & CEO",
                    description: "With a clear vision and a passion for helping people achieve their dreams abroad, Khurram Hashmi has led Infinity Overseas Consultant to become a trusted name in the immigration and study abroad industry.",
                    image: "/founder.jpg",
                    isCeo: true
                }
            });
            console.log("Created Khurram Hashmi as CEO.");
        }
    } catch (error) {
        console.error("Error updating CEO:", error);
    } finally {
        await prisma.$disconnect();
    }
}

updateCeo();
