const { PrismaClient } = require('../src/lib/generated/client_new');
const prisma = new PrismaClient();

async function check() {
    try {
        const res = await prisma.$queryRawUnsafe('SELECT id, name, "isCeo" FROM "TeamMember"');
        console.log("Current Team Members in DB:", JSON.stringify(res, null, 2));
    } catch (err) {
        console.error("Error checking:", err);
    } finally {
        await prisma.$disconnect();
    }
}

check();
