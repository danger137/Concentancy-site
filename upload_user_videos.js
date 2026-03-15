const fs = require('fs');
const { PrismaClient } = require('./src/lib/generated/client_v2');
const cloudinary = require('cloudinary').v2;
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

let url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (url && !url.includes('connect_timeout=')) {
  url += (url.includes('?') ? '&' : '?') + 'connect_timeout=60';
} else if (url) {
  url = url.replace(/connect_timeout=\d+/, 'connect_timeout=60');
}
const prisma = new PrismaClient(url ? { datasourceUrl: url } : undefined);

const videosToUpload = [
    {
        filepath: path.join(__dirname, 'public', 'plane_mission.mp4'),
        title: 'Plane Mission',
        country: 'GLOBAL',
        thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=640&auto=format&fit=crop'
    },
    {
        filepath: path.join(__dirname, 'public', 'student.mp4'),
        title: 'Student Testimonial',
        country: 'GLOBAL',
        thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=640&auto=format&fit=crop'
    },
    {
        filepath: path.join(__dirname, 'public', 'visit.mp4'),
        title: 'Visit Visa Guide',
        country: 'GLOBAL',
        thumbnail: 'https://images.unsplash.com/photo-1488646953014-ce82cb202a46?q=80&w=640&auto=format&fit=crop'
    }
];

async function run() {
    try {
        console.log('Connecting to database...');
        await prisma.$connect();
        
        for (const v of videosToUpload) {
            console.log(`\nProcessing: ${v.title}`);
            if (!fs.existsSync(v.filepath)) {
                console.log(`❌ File not found: ${v.filepath}`);
                continue;
            }
            console.log(`⏳ Saving to database for ${v.title}...`);
            const localUrl = `/${path.basename(v.filepath)}`;
            const created = await prisma.video.create({
                data: {
                    title: v.title,
                    country: v.country,
                    url: localUrl,
                    thumbnail: v.thumbnail
                }
            });
            console.log(`✅ Saved to DB with ID: ${created.id}`);
        }
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        await prisma.$disconnect();
    }
}

run();
