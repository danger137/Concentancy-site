import Link from 'next/link';
import StatCounter from '@/components/StatCounter';
import type { Metadata } from 'next';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';

export const metadata: Metadata = {
    title: "Our Mission | Infinity Overseas Consultants",
    description: "Our mission at Infinity Overseas Consultants is to provide honest, reliable, and personalized overseas education and immigration services that transform lives.",
    keywords: ["Infinity Mission", "Study Abroad Mission", "Immigration Consultancy Mission", "Education Consultant Values"],
    alternates: { canonical: 'https://infinityconsultants.pk/our-mission' },
    openGraph: {
        title: 'Our Mission | Infinity Overseas Consultants',
        description: 'Honest, reliable, and personalized overseas education and immigration services.',
        url: 'https://infinityconsultants.pk/our-mission',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Mission | Infinity Overseas Consultants',
        description: 'Transforming lives through personalized education services.',
    },
};

export default function OurMission() {
    return (
        <>
            {/* Page Header */}
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="text-white h-100 w-100">Our Mission</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Our Mission
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="p_5 bg-white">
                <div className="container-xl d-flex flex-column">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-1 order-2">
                            <Reveal animation="fade-right">
                                <div className="ps-md-4">
                                    <h4 className="col_green text-uppercase fw-bold mb-3">Our Mission</h4>
                                    <h2 className="display-5 fw-bold mb-4">Turning <span className="col_oran">Ambition</span> Into Achievement</h2>
                                    <p className="lead text-muted mb-4">Our mission at Infinity Overseas Consultants is simple yet powerful: to provide honest, transparent, and result-oriented overseas education and immigration services that genuinely transform lives.</p>
                                    <p className="text-muted lh-lg mb-4">We believe that every student deserves a fair chance — regardless of their academic background, financial situation, or past rejections. Our team works tirelessly to ensure that each student receives the personalized support they need to succeed internationally.</p>
                                    <div className="row g-4 pt-2">
                                        <div className="col-6">
                                            <Magnetic>
                                                <div className="p-4 bg-light rounded-4 border-start border-4 border-warning shadow-sm hover-lift transition">
                                                    <h2 className="fw-bold col_oran mb-1">
                                                        <StatCounter end={100} suffix="%" delay={0.5} />
                                                    </h2>
                                                    <p className="small mb-0 text-uppercase fw-bold opacity-75">Visa Success</p>
                                                </div>
                                            </Magnetic>
                                        </div>
                                        <div className="col-6">
                                            <Magnetic>
                                                <div className="p-4 bg-light rounded-4 border-start border-4 border-success shadow-sm hover-lift transition">
                                                    <h2 className="fw-bold col_green mb-1">
                                                        <StatCounter end={10} suffix="k+" delay={0.7} />
                                                    </h2>
                                                    <p className="small mb-0 text-uppercase fw-bold opacity-75">Dreams Fulfilled</p>
                                                </div>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-2 order-1">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-2xl border-bottom border-5 border-success hover-lift transition" style={{ height: '500px' }}>
                                    <LazyVideo
                                        src="/plane_mission.mp4"
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-5 bg-gradient-dark text-white">
                                        <h3 className="fw-bold mb-1">Global Reach</h3>
                                        <p className="opacity-75 mb-0">Connecting Pakistani talent with world-class opportunities.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Values */}
            <section className="p_3 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-5">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                            <Reveal animation="fade-up">
                                <h4 className="col_green h-100 w-100">OUR CORE VALUES</h4>
                                <h1 className="mb-0"><span className="col_oran fw-normal">What We</span> Stand For</h1>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {[
                            { icon: 'fa-shield', title: 'Integrity', desc: 'We operate with full transparency, providing honest guidance and realistic expectations at every step.', color: 'bg_oran' },
                            { icon: 'fa-lightbulb-o', title: 'Innovation', desc: 'We continuously improve our processes and leverage new technologies to simplify the student journey.', color: 'bg_green' },
                            { icon: 'fa-heart', title: 'Compassion', desc: 'We genuinely care about every student and treat each case with empathy and dedication.', color: 'bg_blue' },
                            { icon: 'fa-star', title: 'Excellence', desc: 'We strive for the highest standards in documentation, consultation, and student preparation.', color: 'bg_oran' },
                            { icon: 'fa-check-circle', title: 'Accountability', desc: 'We take ownership of every case and are committed to delivering on our promises.', color: 'bg_green' },
                            { icon: 'fa-graduation-cap', title: 'Empowerment', desc: 'We equip students with the knowledge and confidence to succeed independently abroad.', color: 'bg_blue' },
                        ].map((value, i) => (
                            <div key={i} className="col-md-4 mb-4">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="card border-0 shadow-sm p-4 h-100 hover-lift d-flex flex-column">
                                        <div className="d-flex align-items-center mb-3">
                                            <Magnetic>
                                                <span className={`d-inline-block text-center ${value.color} text-white rounded-3 me-3 p-2`} style={{ minWidth: '50px', height: '50px', lineHeight: '34px' }}>
                                                    <i className={`fa ${value.icon} fs-4`}></i>
                                                </span>
                                            </Magnetic>
                                            <h5 className="mb-0 fw-bold">{value.title}</h5>
                                        </div>
                                        <p className="text-muted mb-0">{value.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission in Action */}
            <section className="p_3">
                <div className="container-xl">
                    <div className="row text-center mb-5">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                            <Reveal animation="fade-up">
                                <h4 className="col_green h-100 w-100">MISSION IN ACTION</h4>
                                <h1 className="mb-0"><span className="col_oran fw-normal">How We</span> Deliver</h1>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {[
                            { step: '01', title: 'Listen & Understand', desc: 'We start every journey by deeply understanding your goals, challenges, and aspirations.' },
                            { step: '02', title: 'Strategize & Plan', desc: 'We design a personalized roadmap covering university selection, documentation, and visa strategy.' },
                            { step: '03', title: 'Execute & Support', desc: 'We handle applications, interviews, and pre-departure prep — supporting you until you land safely abroad.' },
                        ].map((item, i) => (
                            <div key={i} className="col-md-4 mb-4">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="p-4 border_1 rounded-3 h-100 hover-lift d-flex flex-column">
                                        <h1 className="font_60 col_oran opacity-25">{item.step}</h1>
                                        <h4 className="mt-n4 position-relative">{item.title}</h4>
                                        <p className="text-muted">{item.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="p_3 cta_bg text-white text-center">
                <div className="container-xl">
                    <Reveal animation="scale-in">
                        <h2 className="fw-bold">Ready to Start Your Journey?</h2>
                        <p className="mt-3 fs-5 cta_desc">Our mission is your success. Let us help you take the first step toward your international future.</p>
                        <Magnetic>
                            <Link className="button bg-white text-black border-white mt-4 d-inline-block px-5 py-3 fs-5 pulse-button" href="/consultation">Book Free Consultation</Link>
                        </Magnetic>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
