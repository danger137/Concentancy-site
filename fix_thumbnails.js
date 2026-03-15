const { PrismaClient } = require('./src/lib/generated/client_v2');
const prisma = new PrismaClient();

async function run() {
    try {
        await prisma.$connect();
        const videos = await prisma.video.findMany();
        
        for (const v of videos) {
            let newThumbnail = v.thumbnail;
            // Map the titles to our local images in public/img
            if (v.title.includes('Plane')) newThumbnail = '/img/hero_main.png';
            if (v.title.includes('Student')) newThumbnail = '/img/student_1.png';
            if (v.title.includes('Visit')) newThumbnail = '/img/visit_visa_service.png';
            
            if (newThumbnail !== v.thumbnail) {
                await prisma.video.update({
                    where: { id: v.id },
                    data: { thumbnail: newThumbnail }
                });
                console.log(`Updated thumbnail for ${v.title} to ${newThumbnail}`);
            }
        }
        console.log('Thumbnails updated.');
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
run();
