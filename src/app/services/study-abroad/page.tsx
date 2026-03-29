import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';
import { Metadata } from 'next';
import '@/styles/study-abroad.css';

export const metadata: Metadata = {
    title: "Best Study Abroad Consultants | Infinity Overseas",
    description: "Expert guidance for student visas, university admissions, and scholarships in UK, USA, Canada, and Europe. Partner with Faisalabad's top study abroad consultant.",
    keywords: ["study abroad consultant Faisalabad", "student visa UK Pakistan", "study in Europe from Pakistan", "Infinity Overseas study abroad"],
    alternates: { canonical: 'https://infinityconsultants.pk/services/study-abroad' },
};

import StudyAbroadDestinations from '@/components/StudyAbroadDestinations';

export default function StudyAbroad() {
    return (
        <>
            {/* Hero Section */}
            <section className="study-abroad-hero text-white" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/study_abroad_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl position-relative z-index-1">
                    <Reveal animation="fade-down">
                        <span className="col_oran fw-bold text-uppercase letter-spacing-2 mb-3 d-block">Global Opportunities await</span>
                        <h1 className="display-3 fw-bold mb-4">Unlock Your Potential with International Education</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 opacity-75 fw-medium">
                                <li className="breadcrumb-item"><Link className="text-white text-decoration-none" href="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link className="text-white text-decoration-none" href="/services">Services</Link></li>
                                <li className="breadcrumb-item active text-white" aria-current="page">Study Abroad</li>
                            </ol>
                        </nav>
                    </Reveal>
                </div>
            </section>

            {/* Destinations Section */}
            <StudyAbroadDestinations />
        </>
    );
}
