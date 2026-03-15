import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import StatCounter from '@/components/StatCounter';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import { unstable_cache } from 'next/cache';
import TestimonialGrid from '@/components/TestimonialGrid';
import { fallbackSuccessStories } from '@/data/fallbackStories';

export const metadata = {
    title: 'Testimonials - Infinity Overseas Consultant'
};

export const revalidate = 3600; // Fixed from 0 to avoid potential invariant issues

const getCachedStories = unstable_cache(
    async () => {
        try {
            return await prisma.successStory.findMany({ 
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    name: true,
                    feedback: true,
                    image: true,
                    country: true,
                    flag: true,
                    visaType: true,
                    degree: true,
                    date: true,
                    createdAt: true
                }
            });
        } catch (error) {
            console.error("Database connection error in getCachedStories:", error);
            return [];
        }
    },
    ['testimonials-data'],
    { revalidate: 3600 }
);

const DEFAULT_STORIES = fallbackSuccessStories;

export default async function Testimonials() {
    let dbStories: any[] = [];
    try {
        dbStories = await prisma.successStory.findMany({ 
            orderBy: { createdAt: 'desc' }
        });
    } catch (e) {
        console.error("DB Error:", e);
    }
    const storiesToDisplay = dbStories.length > 0 ? dbStories : DEFAULT_STORIES;

    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                                <Reveal animation="fade-down">
                                <h1 className="text-white h-100 w-100">Our Success Stories</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Success Stories
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="intro" className="p_3 bg-light">
                                <div className="container-xl d-flex flex-column">
                    <div className="row justify-content-center text-center">
                        <div className="col-md-10">
                            <Reveal animation="fade-up">
                                <h1 className="mb-3"><span className="col_oran fw-normal">Pakistani Students'</span> Success Stories</h1>
                                <p className="fs-5 text-muted" style={{ lineHeight: 1.8 }}>
                                    At Infinity Overseas Consultant, we are proud to share our students' success stories. Each tale demonstrates our students and team's hard work and dedication. These stories highlight the extraordinary journeys of students we've assisted, from entrance to prominent institutions worldwide to great academic performance.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="testimonials" className="p_3">
                <div className="container-xl">
                    <div className="row feature_1 text-center mb-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green text-uppercase">Student Success Stories</h4>
                                <p className="mt-3 mx-auto text-muted" style={{ maxWidth: 800 }}>
                                    Our students come from diverse backgrounds and have varying ambitions. Read to learn directly from them about their experiences with Infinity Overseas Consultant. Their stories, from scholarship wins to academic success, are fascinating and motivating. Discover how we helped them every step of the way.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
                        <div className="col-12">
                            <TestimonialGrid stories={storiesToDisplay as any} />
                        </div>
                    </div>
                </div>
            </section>

            <section className="p_3 bg-light text-center">
                <div className="container-xl">
                    <div className="row justify-content-center">
                        <div className="col-md-8 mb-4">
                                <Reveal animation="fade-up">
                                <h2 className="mb-3 fw-bold">Our Commitment</h2>
                                <p className="text-muted fs-5" style={{ lineHeight: 1.8 }}>
                                    At Infinity Overseas Consultant, we are dedicated to providing personalised support and guidance to every student. Our team of experts works hard to ensure each student finds the best educational path to reach their goals. We believe in every student’s potential and are committed to helping them succeed.
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p_3">
                                <div className="container-xl d-flex flex-column">
                    <Reveal animation="scale-in">
                        <div className="row align-items-center bg_blue p-5 rounded-4 shadow-lg text-white">
                            <div className="col-md-7">
                                <h2 className="mb-3">Join Our Success Stories</h2>
                                <p className="mb-4" style={{ fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.9 }}>
                                    We warmly invite you to join our growing group of successful students. Whether you're just beginning to look at your options or are ready to take the next step in your academic journey, Infinity Overseas Consultant is here to help. Come with us, and together we will build your success story.
                                </p>
                                <Magnetic>
                                    <Link href="/consultation" className="button bg-white text-black border-white px-5 py-3 fs-5 d-inline-block fw-bold pulse-button">
                                        Get a Free Consultation Today
                                    </Link>
                                </Magnetic>
                            </div>
                            <div className="col-md-5 mt-4 mt-md-0">
                                <div className="row text-center g-4">
                                    <div className="col-6">
                                        <Reveal animation="fade-up" delay={0.2}>
                                            <div className="p-4 bg-white bg-opacity-10 rounded-3 border border-light border-opacity-25 h-100">
                                                <h1 className="display-4 fw-bold col_oran mb-0"><StatCounter end={140} suffix="+" /></h1>
                                                <p className="mb-0 text-uppercase small fw-bold mt-2" style={{ letterSpacing: '1px' }}>Partnered Universities</p>
                                            </div>
                                        </Reveal>
                                    </div>
                                    <div className="col-6 mb-4 d-flex flex-column">
                                <Reveal animation="fade-up" delay={0.4} className="h-100 w-100">
                                <div className="p-4 bg-white bg-opacity-10 rounded-3 border border-light border-opacity-25 h-100 d-flex flex-column">
                                                <h1 className="display-4 fw-bold col_oran mb-0"><StatCounter end={750} suffix="+" /></h1>
                                                <p className="mb-0 text-uppercase small fw-bold mt-2" style={{ letterSpacing: '1px' }}>Global Counsellors</p>
                                            </div>
                                        </Reveal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
