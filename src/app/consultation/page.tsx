import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

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

    return (
        <>
            <section id="center" className="consultation_hero" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.85), rgba(7, 41, 77, 0.85)), url("/img/study_abroad_service.png")', backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 0 160px' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-white">
                            <h1 className="display-3 fw-bold text-white mb-3">Begin Your Global Journey</h1>
                            <p className="fs-5 text-white mb-5 max-w-600">Connect with our senior consultants for a tailored strategy that turns your global ambitions into reality.</p>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mt-4 bg-transparent border-0 p-0 text-white">
                                    <li className="breadcrumb-item"><Link className="text-white text-decoration-none opacity-75 hvr-col" href="/">Home</Link></li>
                                    <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Free Consultation</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Consultation Layout Section */}
            <section id="consultation_content" className="p_5 bg-white position-relative" style={{ marginTop: '-80px', zIndex: 5 }}>
                <div className="container-xl">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-11">
                            <div className="card border-0 shadow-2xl rounded-5 overflow-hidden">
                                <div className="row g-0">
                                    {/* Left Side: Massive Phone Number */}
                                    <div className="col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-center bg_blue position-relative" style={{ borderRight: '5px solid #FF7700' }}>
                                        {/* Decorative elements */}
                                        <div className="position-absolute rounded-circle" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,119,0,0.15) 0%, rgba(255,119,0,0) 70%)', top: '-100px', left: '-100px' }}></div>
                                        
                                        <div className="position-relative z-index-1">
                                            <span className="badge bg-white text-dark mb-4 py-2 px-3 rounded-pill fw-bold shadow-sm" style={{ letterSpacing: '2px' }}>
                                                <i className="fa fa-phone col_oran me-2"></i> DIRECT HELPLINE
                                            </span>
                                            <h1 className="fw-bolder mb-4 helpline-number">
                                                <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`} className="text-decoration-none col_oran transition-all d-inline-block hvr-grow" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
                                                    {settings.phone}
                                                </a>
                                            </h1>
                                            <p className="text-white opacity-75 fs-5 mb-0 ps-3 border-start border-3" style={{ borderColor: 'rgba(255,119,0,0.5) !important' }}>
                                                Available Monday to Saturday<br/> 
                                                <span className="fw-bold">9:00 AM - 6:00 PM</span> for expert consultancy.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right Side: Location and Socials */}
                                    <div className="col-lg-5 p-4 p-md-5 bg-white d-flex flex-column justify-content-center">
                                        <div className="mb-5">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light shadow-sm me-3" style={{ width: '60px', height: '60px' }}>
                                                    <i className="fa fa-map-marker col_oran fs-3"></i>
                                                </div>
                                                <h3 className="fw-bold mb-0" style={{ color: '#07294D' }}>Office Location</h3>
                                            </div>
                                            <p className="text-muted fs-5 lh-base ps-1 ms-5 ps-4">
                                                {settings.location}
                                            </p>
                                        </div>

                                        <hr className="bg-light opacity-50 mb-4" />

                                        <div>
                                            <h5 className="fw-bold mb-4 text-uppercase text-muted" style={{ letterSpacing: '1px' }}>Connect Digitally</h5>
                                            <div className="d-flex gap-3">
                                                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm hvr-grow" style={{ width: '60px', height: '60px', borderWidth: '2px' }}>
                                                    <i className="fa fa-facebook-f fs-3"></i>
                                                </a>
                                                <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center shadow-sm hvr-grow" style={{ width: '60px', height: '60px', borderWidth: '2px' }}>
                                                    <i className="fa fa-instagram fs-3"></i>
                                                </a>
                                                <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center shadow-sm hvr-grow" style={{ width: '60px', height: '60px', borderWidth: '2px' }}>
                                                    <i className="fa fa-youtube-play fs-3"></i>
                                                </a>
                                                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm hvr-grow" style={{ width: '60px', height: '60px', borderWidth: '2px' }}>
                                                    <i className="fa fa-linkedin fs-3"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}


