import Link from 'next/link';
import { Metadata } from 'next';
import { Reveal } from '@/components/RevealAnimations';
import "../../styles/event.css";
import EventTabsWrapper from '@/components/EventTabsWrapper';
import VideoSection from '@/components/VideoSection';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
    title: 'Upcoming Study Abroad Events & Seminars | Infinity Overseas',
    description: 'Stay updated with the latest educational expos, university seminars, and visa workshops by Infinity Overseas in Faisalabad. Join us to plan your global future.',
    keywords: ['Study abroad events Faisalabad', 'Infinity Overseas seminars', 'educational expo Pakistan', 'university fairs Faisalabad'],
    alternates: { canonical: 'https://infinityconsultants.pk/event' },
};

async function getInitialEvents(dayId: string) {
    try {
        return await prisma.event.findMany({
            where: { dayId },
            orderBy: { createdAt: 'asc' }
        });
    } catch (e) {
        console.error('Initial events fetch error:', e);
        return [];
    }
}

async function getVideos() {
    try {
        return await prisma.video.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (e) {
        return [];
    }
}

export default async function Event() {
    const initialDay = 'day1';
    const [initialEvents, videos] = await Promise.all([
        getInitialEvents(initialDay),
        getVideos()
    ]);

    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12">
                            <Reveal animation="fade-down">
                                <h1 className="text-white">Our Upcoming Events/Testimonials</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Events
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <VideoSection videos={videos} />

            <section id="event" className="p_3 pt-5">
                <div className="container-xl">
                    <div className="row mb-4">
                        <div className="col-12">
                            <Reveal animation="fade-up">
                                <h1 className="display-4 fw-bold mb-0 col_oran">Our Upcoming Events/Testimonials</h1>
                                <p className="lead text-dark fw-bold mt-2">Join us to plan your global educational journey!</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="event_m position-relative">
                        <EventTabsWrapper initialDay={initialDay} initialEvents={initialEvents} />
                    </div>
                </div>
            </section>
        </>
    );
}
