const { PrismaClient } = require('./src/lib/generated/client_v2/index.js');
const prisma = new PrismaClient();

async function main() {
  try {
    const q1 = await prisma.faq.deleteMany();
    const q2 = await prisma.teamMember.deleteMany();
    console.log(`Deleted ${q1.count} FAQs and ${q2.count} Team Members`);
  } catch (err) {
    console.error('Error during deletion:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
