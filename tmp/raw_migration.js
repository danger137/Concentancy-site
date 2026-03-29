const { PrismaClient } = require('../src/lib/generated/client_new');
const prisma = new PrismaClient();

async function addColumn() {
    try {
        console.log("Attempting to add 'isCeo' column via raw SQL...");
        await prisma.$executeRawUnsafe(`ALTER TABLE "TeamMember" ADD COLUMN IF NOT EXISTS "isCeo" BOOLEAN DEFAULT false;`);
        console.log("Column added successfully (or already exists).");

        console.log("Setting Khurram Hashmi as CEO...");
        const member = await prisma.teamMember.findFirst({
            where: { name: { contains: "Khurram" } }
        });

        const longBio = `With a clear vision and an unwavering passion for empowering students, Khurram Hashmi has established Infinity Overseas Consultant as a beacon of trust and excellence in the global education industry. Over the past decades, he has meticulously built a consultancy that prioritizes student aspirations above all else. 

His leadership style is defined by a commitment to strategic innovation and a deep-seated belief that every student deserves a world-class education. Under his guidance, Infinity has successfully assisted over 10,000 students in securing admissions and visas for top-tier institutions across the UK, USA, Canada, and Australia. 

Khurram's expertise goes beyond simple consultation; he is a visionary who understands the nuances of global immigration trends and the evolving landscape of international academia. His 100% success rate in major visa categories is a testament to his precision and dedication. As the CEO, he continues to drive the company forward, ensuring that Infinity remains at the forefront of educational consulting, moving dreams into reality.`.replace(/'/g, "''");

        if (member) {
            await prisma.$executeRawUnsafe(`UPDATE "TeamMember" SET "isCeo" = true, "description" = '${longBio}', "image" = '/img/ceo_premium.png' WHERE id = '${member.id}'`);
            console.log("Success: Khurram Hashmi set as CEO with updated bio and image.");
        } else {
            console.log("Khurram Hashmi not found. Creating...");
            await prisma.$executeRawUnsafe(`INSERT INTO "TeamMember" (id, name, role, description, image, "isCeo", "updatedAt") VALUES ('ceo_1', 'Khurram Hashmi', 'Founder & CEO', '${longBio}', '/img/ceo_premium.png', true, NOW());`);
            console.log("Success: Khurram Hashmi created via raw SQL.");
        }
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await prisma.$disconnect();
    }
}

addColumn();
