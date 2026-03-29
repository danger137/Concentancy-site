const { PrismaClient } = require('../lib/prisma');
const prisma = new PrismaClient();

async function fix() {
    try {
        console.log('Searching for UK blog...');
        const blog = await prisma.blog.findFirst({
            where: {
                title: {
                    contains: 'Study In The UK',
                    mode: 'insensitive'
                }
            }
        });

        if (blog) {
            console.log('Found blog:', blog.id);
            await prisma.blog.update({
                where: { id: blog.id },
                data: { image: '/img/3.png' }
            });
            console.log('Successfully updated blog image to /img/3.png');
        } else {
            console.log('Blog not found with that title');
        }
    } catch (error) {
        console.error('Error during update:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fix();
