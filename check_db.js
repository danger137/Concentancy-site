const { PrismaClient } = require('./src/lib/generated/client_new');
const prisma = new PrismaClient();

async function main() {
  try {
    const stories = await prisma.successStory.findMany({ take: 1 });
    console.log('Success stories found:', stories);
    if (stories.length > 0) {
      console.log('Columns check:', {
        country: stories[0].country,
        visaType: stories[0].visaType,
        degree: stories[0].degree
      });
    } else {
      console.log('No stories found to check columns.');
    }
  } catch (e) {
    console.error('Error during column check:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
