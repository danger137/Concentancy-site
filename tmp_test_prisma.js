
const { PrismaClient } = require('./src/lib/generated/client_v2');

async function test() {
  try {
    console.log('Environment DATABASE_URL:', process.env.DATABASE_URL);
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    console.log('Prisma Client instantiated successfully');
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Query result:', result);
    await prisma.$disconnect();
  } catch (e) {
    console.error('Test Failed:');
    console.error(e);
  }
}

test();
