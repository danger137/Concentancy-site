import React from 'react';
import Link from 'next/link';
import ConsultationFormWrapper from '@/components/ConsultationFormWrapper';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import { prisma } from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Infinity Overseas Faisalabad Education Consultants',
    description: 'Get in touch with Infinity Overseas Faisalabad. Expert consultancy for UK, Europe, and Canada student visas. Visit our office or book a virtual consultation.',
    keywords: ['Contact Infinity Overseas', 'Education consultants Faisalabad contact', 'Study abroad office Faisalabad', 'visa consultancy phone number'],
    alternates: { canonical: 'https://infinityconsultants.pk/contact' },
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
        console.error('Error fetching settings directly from Prisma:', err);
        return defaultSettings;
    }
}

export default async function Contact() {
    const settings = await getSettings();

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.9), rgba(7, 41, 77, 0.9)), url("/img/study_abroad_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1 py-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-down">
                                <h1 className="text-white display-3 fw-bold mb-3">Contact Best Education Consultants</h1>
                                <p className="mt-3 lead text-white section-desc">
                                    Have questions about studying abroad? Our expert consultants at Infinity Overseas (IOC) are here to help you navigate your journey to success.
                                </p>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item"><Link className="text-white text-decoration-none opacity-75" href="/">Home</Link></li>
                                        <li className="breadcrumb-item active text-white fw-bold" aria-current="page">Contact Us</li>
                                    </ol>
                                </nav>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Layout Section */}
            <section className="p_5 bg-white" style={{ marginTop: '-40px' }}>
                <div className="container-xl">
                    <div className="row g-0 contact-container rounded-4 overflow-hidden shadow-2xl">
                        {/* Map Column */}
                        <div className="col-lg-6 p-0 map-col">
                            <div className="h-100 min-vh-50">
                                <Reveal animation="fade-right" className="h-100">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.8876!2d73.1119!3d31.4158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392242a895a55ca9%3A0xdec58f88932671c6!2sMedia%20Com%20Plaza!5e0!3m2!1sen!2s!4v1741224213000!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0, minHeight: '650px' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    ></iframe>
                                </Reveal>
                            </div>
                        </div>

                        {/* Form Column */}
                        <div className="col-lg-6 p-0">
                            <Reveal animation="fade-left">
                                    <ConsultationFormWrapper settings={settings} />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .contact-container {
                    border: 4px solid #07294D;
                }
                .map-col {
                    border-right: 4px solid #07294D;
                }
                @media (max-width: 991px) {
                    .map-col {
                        border-right: none;
                        border-bottom: 4px solid #07294D;
                    }
                }
            `}} />
        </>
    );
}


