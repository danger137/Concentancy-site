const { PrismaClient } = require('./src/lib/generated/client_new');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Adding 'name' column...");
        await prisma.$executeRawUnsafe(`ALTER TABLE "Subscriber" ADD COLUMN IF NOT EXISTS "name" TEXT;`);

        console.log("Adding 'createdAt' column...");
        await prisma.$executeRawUnsafe(`ALTER TABLE "Subscriber" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;`);

        console.log("Database schema fix applied successfully!");
    } catch (e) {
        console.error("Database schema fix encountered an error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
