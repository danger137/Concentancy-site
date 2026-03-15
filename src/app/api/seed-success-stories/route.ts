import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

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

export async function GET() {
    try {
        console.log('API Seeding started...');
        await prisma.successStory.deleteMany();
        for (const story of successStories) {
            await prisma.successStory.create({
                data: story
            });
        }
        console.log('API Seeding finished.');
        return NextResponse.json({ 
            success: true, 
            message: 'Seeded 7 countries successfully',
            count: successStories.length
        });
    } catch (error: any) {
        console.error('API Seeding failed:', error);
        return NextResponse.json({ 
            success: false, 
            error: error.message 
        }, { status: 500 });
    }
}
