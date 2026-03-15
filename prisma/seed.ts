import { PrismaClient } from '../src/lib/generated/client_v2/index.js';

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

const successStories = [
    {
        name: "Aisha Khan",
        feedback: "Infinity Overseas Consultant made my dream of studying in the UK a reality! Their team guided me through every step of the visa process.",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop",
        country: "UK",
        visaType: "Study Visa",
        degree: "MSc Engineering Management",
        date: "12 Aug, 2025"
    },
    {
        name: "Ali Raza",
        feedback: "The process of applying to French universities seemed daunting, but Infinity made it seamless. Highly recommended!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
        country: "FRANCE",
        visaType: "Study Visa",
        degree: "Master's in Data Science",
        date: "05 Sep, 2025"
    },
    {
        name: "Fatima Noor",
        feedback: "Exceptional service! They provided all the right details for studying in Germany. I am so grateful for their support.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
        country: "GERMANY",
        visaType: "Study Visa",
        degree: "MBA",
        date: "22 Jul, 2025"
    },
    {
        name: "Hassan Tariq",
        feedback: "Italy has always been my dream destination. With Infinity Overseas, I got admission to a top university with a scholarship.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop",
        country: "ITALY",
        visaType: "Study Visa",
        degree: "BSc Computer Science",
        date: "18 Oct, 2025"
    },
    {
        name: "Sana Malik",
        feedback: "Got my visa for Australia in record time thanks to the dedicated team at IO Consultants. Best consultants in town!",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
        country: "AUSTRALIA",
        visaType: "Study Visa",
        degree: "Master of Public Health",
        date: "10 Nov, 2025"
    },
    {
        name: "Usman Ahmed",
        feedback: "The guidance for Canadian universities was top-notch. I felt supported throughout the complicated application process.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
        country: "CANADA",
        visaType: "Study Visa",
        degree: "BEng Civil Engineering",
        date: "03 Dec, 2025"
    },
    {
        name: "Zainab Javed",
        feedback: "Studying in the USA was my ultimate goal. They helped me ace my visa interview and choose the right program.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop",
        country: "USA",
        visaType: "Study Visa",
        degree: "MSc Business Administration",
        date: "25 Jan, 2026"
    }
];

async function main() {
    console.log('Seeding blogs...');
    // Delete existing blogs to prevent duplicates if running seed multiple times
    await prisma.blog.deleteMany();
    for (const blog of blogs) {
        await prisma.blog.create({
            data: blog
        });
    }

    console.log('Seeding success stories...');
    // Delete existing stories to ensure we have exactly our 7 countries
    await prisma.successStory.deleteMany();
    for (const story of successStories) {
        await prisma.successStory.create({
            data: story
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
