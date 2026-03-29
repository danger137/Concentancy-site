const { PrismaClient } = require('../src/lib/generated/client_new');
const prisma = new PrismaClient();

async function run() {
    try {
        // 1. Check if the column exists, if not, wait for prisma push
        // 2. We skip types by using any or raw sql
        console.log("Setting Khurram Hashmi as CEO...");

        // Find him first
        const member = await prisma.teamMember.findFirst({
            where: { name: { contains: "Khurram" } }
        });

        if (member) {
            // Use raw SQL to be safe against outdated client types
            await prisma.$executeRawUnsafe(`UPDATE "TeamMember" SET "isCeo" = true WHERE id = '${member.id}'`);
            console.log("Success: Khurram Hashmi set as CEO.");
        } else {
            console.log("Khurram Hashmi not found. Creating...");
            await prisma.teamMember.create({
                data: {
                    name: "Khurram Hashmi",
                    role: "Founder & CEO",
                    description: "With a clear vision and a passion for helping people achieve their dreams abroad, Khurram Hashmi has led Infinity Overseas Consultant to become a trusted name in the immigration and study abroad industry.",
                    image: "/founder.jpg",
                    isCeo: true
                }
            });
            console.log("Success: Khurram Hashmi created and set as CEO.");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

run();
