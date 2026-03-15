import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import StudyAbroadAnimation from '@/components/StudyAbroadAnimation';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import StatCounter from '@/components/StatCounter';

export const metadata: Metadata = {
    title: "Our Vision | Infinity Overseas Consultants",
    description: "Discover the vision of Infinity Overseas Consultants – to become the most trusted global education and immigration partner, transforming lives through international opportunities.",
    keywords: ["Infinity Vision", "Study Abroad Vision", "Immigration Consultants Goals", "Global Education"],
    alternates: { canonical: 'https://infinityconsultants.pk/our-vision' },
    openGraph: {
        title: 'Our Vision | Infinity Overseas Consultants',
        description: 'Transforming lives through international education and immigration opportunities.',
        url: 'https://infinityconsultants.pk/our-vision',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Vision | Infinity Overseas Consultants',
        description: 'Our vision to become the most trusted global education partner.',
    },
};

export default function OurVision() {
    return (
        <>
            {/* Page Header */}
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="text-white h-100 w-100">Our Vision & Expertise</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Our Vision
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Statement */}
            <section className="p_3">
                <div className="container-xl d-flex flex-column">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <Reveal animation="fade-right">
                                <div className="position-relative overflow-hidden rounded-4 shadow-lg" style={{ minHeight: '500px', backgroundColor: '#07294D' }}>
                                    <img
                                        src="/img/vision_page_main.png?v=3"
                                        alt="Envisioning a Borderless Future"
                                        className="w-100 d-block"
                                        style={{ height: '500px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, rgba(7, 41, 77, 0.95))' }}>
                                        <h3 className="text-white fw-bold mb-1">Envisioning a <span className="col_oran">Borderless</span> Future</h3>
                                        <p className="text-light-50 mb-0 small">Transforming global education access for everyone.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 ps-md-5">
                            <Reveal animation="fade-left">
                                <h4 className="col_green text-uppercase">OUR VISION</h4>
                                <h2 className="fw-bold mt-2">Empowering Dreams Across Borders</h2>
                                <p className="mt-4">At Infinity Overseas Consultants, our vision is to become the most trusted and result-driven overseas education and immigration consultancy in the region — bridging the gap between ambition and opportunity on a global scale.</p>
                                <p>We envision a future where no student is held back by geography, finances, or previous rejections. Through personalized guidance, ethical practices, and relentless pursuit of excellence, we aim to transform how people access international education.</p>
                                <div className="mt-4">
                                    <div className="d-flex align-items-start mb-3">
                                        <Magnetic>
                                            <span className="d-inline-block text-center bg_oran text-white rounded-3 me-3 p-2" style={{ minWidth: '45px', height: '45px', lineHeight: '28px' }}>
                                                <i className="fa fa-globe fs-4"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="mb-1">Global Access</h5>
                                            <p className="mb-0 font_14">Making world-class education accessible to students from every background.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start mb-3">
                                        <Magnetic>
                                            <span className="d-inline-block text-center bg_green text-white rounded-3 me-3 p-2" style={{ minWidth: '45px', height: '45px', lineHeight: '28px' }}>
                                                <i className="fa fa-check-circle fs-4"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="mb-1">Trusted Partnership</h5>
                                            <p className="mb-0 font_14">Building lifelong relationships based on transparency and real results.</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-start">
                                        <Magnetic>
                                            <span className="d-inline-block text-center bg_blue text-white rounded-3 me-3 p-2" style={{ minWidth: '45px', height: '45px', lineHeight: '28px' }}>
                                                <i className="fa fa-rocket fs-4"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="mb-1">Innovation First</h5>
                                            <p className="mb-0 font_14">Using modern technology and processes to simplify the study-abroad journey.</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Pillars */}
            <section className="p_3 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green">WHAT DRIVES US</h4>
                                <h1 className="mb-0"><span className="col_oran fw-normal">Our Vision</span> Pillars</h1>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row">
                        {[
                            { icon: 'fa-users', end: 10000, suffix: '+', title: ' Lives Transformed', desc: 'We aim to impact over 10,000 students and families by opening doors to global education and career opportunities.' },
                            { icon: 'fa-trophy', end: 100, suffix: '%', title: ' Success Commitment', desc: 'We are committed to maintaining our track record of success even in the most challenging visa and admission cases.' },
                            { icon: 'fa-heart', title: 'Student-First Approach', desc: 'Every decision, every process, and every strategy is designed with the student at the center of it all.' },
                        ].map((pillar: any, i) => (
                            <div key={i} className="col-md-4 mb-4">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="card border-0 shadow-sm p-4 h-100 text-center hover-lift d-flex flex-column align-items-center">
                                        <Magnetic>
                                            <i className={`fa ${pillar.icon} fa-3x col_oran mb-3`}></i>
                                        </Magnetic>
                                        <h4>
                                            {pillar.end ? <StatCounter end={pillar.end} suffix={pillar.suffix} /> : null}
                                            {pillar.title}
                                        </h4>
                                        <p className="text-muted">{pillar.desc}</p>
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
                        <h2 className="fw-bold">Be Part of Our Vision</h2>
                        <p className="mt-3 fs-5 cta_desc">Join thousands of students who have turned their dreams into reality with Infinity Overseas Consultants.</p>
                        <Magnetic>
                            <Link className="button bg-white text-black border-white mt-4 d-inline-block px-5 py-3 fs-5 pulse-button" href="/consultation">Book Free Consultation</Link>
                        </Magnetic>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
