import React from 'react';
import Link from 'next/link';
import StatCounter from '@/components/StatCounter';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ConsultationFormWrapper from '@/components/ConsultationFormWrapper';

export const metadata: Metadata = {
    title: 'Book Free Consultation | Infinity Overseas Faisalabad',
    description: 'Schedule a free 1-on-1 consultation with Infinity Overseas. Expert guidance for student visas, immigration, and scholarship applications in Faisalabad.',
    keywords: ['Free visa consultation', 'Infinity Overseas appointment', 'study abroad advisor Faisalabad', 'immigration consultation Pakistan'],
    alternates: { canonical: 'https://infinityconsultants.pk/consultation' },
};

async function getSettings() {
    const defaultSettings = {
        email: 'Infinityconsultantsfsd@gmail.com',
        phone: '+92 326 4571906',
        location: 'Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad'
    };
    try {
        const settings = await prisma.siteSetting.findUnique({ where: { id: 'default' } });
        return settings || defaultSettings;
    } catch (err) {
        console.error('Error fetching settings directly from Prisma in Consultation:', err);
        return defaultSettings;
    }
}

export default async function Consultation() {
    const settings = await getSettings();

    const expectationSteps = [
        { title: 'Personal Assessment', desc: 'Our experts analyze your academic and professional background to find the best pathways.', icon: 'fa-user-o' },
        { title: 'Strategic Roadmap', desc: 'We provide a clear, step-by-step plan for your admission or immigration journey.', icon: 'fa-map-o' },
        { title: 'Financial Briefing', desc: 'Receive a transparent breakdown of costs, fees, and potential scholarships.', icon: 'fa-money' },
        { title: 'Q&A Session', desc: 'Get direct answers to your specific concerns from experienced consultants.', icon: 'fa-comments-o' }
    ];

    return (
        <>
            <section id="center" className="consultation_hero" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.85), rgba(7, 41, 77, 0.85)), url("/img/study_abroad_service.png")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 0 160px' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white">
                            <h1 className="display-3 fw-bold text-white mb-3">Begin Your Global Journey</h1>
                            <p className="fs-5 opacity-75 mb-5 max-w-600 mx-auto">Connect with our senior consultants for a tailored strategy that turns your global ambitions into reality.</p>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center mt-4 bg-transparent border-0 p-0 text-white">
                                    <li className="breadcrumb-item"><Link className="text-white text-decoration-none opacity-75 hvr-col" href="/">Home</Link></li>
                                    <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Free Consultation</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consultation Layout Section */}
            <section id="consultation_content" className="p_5 bg-white" style={{ marginTop: '-80px' }}>
                <div className="container-xl">
                    <div className="row g-0 border border-danger border-5 rounded-4 overflow-hidden shadow-2xl">
                        {/* Map Column */}
                        <div className="col-md-6 order-2 order-md-1">
                            <div className="h-100 min-vh-50">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8876!2d73.1119!3d31.4158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0xdec58f88932671c6!2sMedia%20Com%20Plaza!5e0!3m2!1sen!2s!4v1741224213000!5m2!1sen!2s"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '600px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="col-md-6 order-1 order-md-2 bg-white">
                            <ConsultationFormWrapper settings={settings} />
                        </div>
                    </div>
                </div>
            </section>


            {/* What to Expect Section - Increasing Page Length */}
            <section className="p_5 bg-light overflow-hidden">
                <div className="container-xl">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <h4 className="col_green uppercase fw-bold">YOUR CONSULTATION JOURNEY</h4>
                            <h2 className="display-4 fw-bold mb-0">What to <span className="col_oran">Expect?</span></h2>
                            <p className="text-muted max-w-600 mx-auto mt-3">Our consultation logic is structured to provide maximum value in minimal time.</p>
                        </div>
                    </div>
                    <div className="row g-4">
                        {expectationSteps.map((step, i) => (
                            <div key={i} className="col-md-3">
                                <div className="p-4 bg-white rounded-4 shadow-sm border h-100 transition-all hvr-float-shadow">
                                    <div className="mb-4 d-inline-flex p-3 rounded-circle bg_blue text-white shadow-md">
                                        <i className={`fa ${step.icon} fs-4 text-white`}></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">{step.title}</h5>
                                    <p className="text-muted small mb-0">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Reach Section */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-2 text-center text-md-start">
                            <h2 className="display-4 fw-bold mb-4 h1">Our Commitment to <span className="col_green">Your Success</span></h2>
                            <p className="lead text-muted mb-4">With offices in Faisalabad and partners globally, we ensure you have support wherever you go.</p>
                            <div className="d-flex flex-wrap gap-4 mt-4 justify-content-center justify-content-md-start">
                                <div className="text-center">
                                    <h3 className="fw-bold col_oran mb-0"><StatCounter end={1500} suffix="+" /></h3>
                                    <span className="small text-muted text-uppercase">Students Placed</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold col_oran mb-0"><StatCounter end={40} suffix="+" /></h3>
                                    <span className="small text-muted text-uppercase">Countries Covered</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="fw-bold col_oran mb-0"><StatCounter end={10} suffix="+" /></h3>
                                    <span className="small text-muted text-uppercase">Years Experience</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <div className="p-3 bg-light rounded-5 shadow-inner">
                                <img src="/img/global_campus.png" className="img-fluid rounded-5 shadow-lg grayscale-hover transition-all" alt="Infinity Global Office" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


