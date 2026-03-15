const { PrismaClient } = require('./src/lib/generated/client_v2');
const prisma = new PrismaClient();

async function run() {
    try {
        await prisma.$connect();
        const videos = await prisma.video.findMany();
        console.log('Total videos before deletion:', videos.length);
        
        let deleted = 0;
        for (const v of videos) {
            // Delete if url contains 'mock' or doesn't start with / path
            if (v.url.includes('mock') || v.url.includes('youtube.com')) {
                await prisma.video.delete({ where: { id: v.id } });
                console.log('Deleted:', v.title);
                deleted++;
            }
        }
        console.log(`Deleted ${deleted} videos. Keeping ${videos.length - deleted} videos.`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
run();
