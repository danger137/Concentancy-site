const { PrismaClient } = require('../src/lib/generated/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Starting manual table creation...');
    try {
        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "TeamMember" (
                "id" TEXT NOT NULL,
                "name" TEXT NOT NULL,
                "role" TEXT NOT NULL,
                "description" TEXT NOT NULL,
                "image" TEXT NOT NULL,
                "twitter" TEXT,
                "instagram" TEXT,
                "linkedin" TEXT,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
            );
        `);
        console.log('Table "TeamMember" created or already exists.');

        await prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS "Service" (
                "id" TEXT NOT NULL,
                "title" TEXT NOT NULL,
                "description" TEXT NOT NULL,
                "image" TEXT NOT NULL,
                "icon" TEXT NOT NULL,
                "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
            );
        `);
        console.log('Table "Service" created or already exists.');

    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
