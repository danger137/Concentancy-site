const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const blogs = [
    {
        date: "16 Jun",
        category: "Businessuk",
        title: "Study In The UK With Infinity Overseas Consultant !",
        description: "If you’re looking to explore everything about studying in the United Kingdom, you’re in the right place! At Infinity Overseas...",
        content: "If you’re looking to explore everything about studying in the United Kingdom, you’re in the right place! At Infinity Overseas Consultant, we specialize in helping students navigate the complexities of studying in the UK. From choosing the right university to securing your visa, we are here to support you every step of the way. The UK offers a world-class education system, vibrant culture, and excellent career opportunities for international students.",
        image: "/img/3.png"
    },
    {
        date: "23 Jun",
        category: "Businesseurope",
        title: "Study In Europe – Explore, Learn, And Grow!",
        description: "Thinking of studying abroad? Europe could be the perfect choice for you. With centuries-old universities, world-class education...",
        content: "Thinking of studying abroad? Europe could be the perfect choice for you. With centuries-old universities, world-class education, and a diverse range of cultures, Europe offers an unparalleled experience for students. Whether you want to study in Germany, France, Italy, or any other European country, Infinity Overseas Consultant can help you find the best programs and guide you through the application process.",
        image: "/img/4.png"
    },
    {
        date: "23 Jun",
        category: "Businessfinland",
        title: "Study In Finland – Your Next Big Step!",
        description: "When it comes to top-quality education, Finland is always among the first countries that come to mind. This beautiful Nordic...",
        content: "When it comes to top-quality education, Finland is always among the first countries that come to mind. This beautiful Nordic country is known for its innovative teaching methods and high standard of living. Study in Finland and experience a unique blend of nature and modern education. At Infinity Overseas Consultant, we provide expert advice on Finnish universities and visa requirements.",
        image: "/img/5.png"
    }
];

async function main() {
    console.log('Seeding blogs...');
    for (const blog of blogs) {
        await prisma.blog.create({
            data: blog
        });
    }
    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
