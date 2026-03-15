import { prisma } from './src/lib/prisma';

async function main() {
    console.log('Testing Subscriber upsert...');
    try {
        const email = 'test-' + Date.now() + '@example.com';
        const result = await prisma.subscriber.upsert({
            where: { email },
            update: {},
            create: { email }
        });
        console.log('Success:', result);
    } catch (error) {
        console.error('FAILED:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
