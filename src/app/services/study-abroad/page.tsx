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

export default function StudyAbroad() {
    /* ─── Admission Regions ─── */
    const admissionRegions = [
        {
            region: 'UK & Ireland',
            icon: 'fa-university',
            color: 'bg_blue',
            items: ['UCAS application support', 'Direct university applications', 'Oxbridge preparation'],
        },
        {
            region: 'Schengen Europe',
            subtitle: 'Sweden, Denmark, Finland, France, Italy, Spain',
            icon: 'fa-globe',
            color: 'bg_green',
            items: ['University admissions through national portals', 'UniversityAdmission.se, optagelse.dk, Studyinfo.fi', 'Campus France, Universitaly'],
        },
        {
            region: 'Eastern Europe',
            subtitle: 'Romania, Hungary, Lithuania, Georgia',
            icon: 'fa-building',
            color: 'bg_oran',
            items: ['Direct university partnerships', 'Fast-track admissions'],
        },
        {
            region: 'Mediterranean',
            subtitle: 'Cyprus, Malta, Turkey',
            icon: 'fa-sun-o',
            color: 'bg_oran',
            items: ['English-taught program placements', 'No-IELTS options'],
        },
        {
            region: 'GCC (Dubai)',
            icon: 'fa-building-o',
            color: 'bg_blue',
            items: ['Branch campus admissions', 'UK degree certification'],
        },
    ];

    /* ─── Schengen Visa Items ─── */
    const schengenItems = [
        'Long-stay national visa (Type D) application',
        'Residence permit applications',
        'Proof of funds documentation (varies €150-700/month by country)',
        'Health insurance coordination (€30,000+ coverage required)',
        'Biometrics appointment scheduling',
        'Blocked account guidance (where applicable)',
    ];

    const nonSchengenVisas = [
        { country: 'UK', detail: 'Student Route visa (formerly Tier 4), credibility interview prep, IHS payment' },
        { country: 'Ireland', detail: 'D Study Visa, BIVS (British Irish Visa Scheme) guidance' },
        { country: 'Cyprus', detail: 'Yellow Slip student permit (Category 1)' },
        { country: 'Turkey', detail: 'Student visa through e-Consulate' },
        { country: 'Georgia', detail: 'D3 student visa' },
        { country: 'Romania', detail: 'Long-stay visa for studies' },
        { country: 'Dubai', detail: 'Student residence visa sponsored by educational institutions' },
    ];

    /* ─── Documents ─── */
    const documentServices = [
        { icon: 'fa-certificate', title: 'HEC Attestation', desc: 'For degrees (mandatory for all European applications)' },
        { icon: 'fa-bank', title: 'MOFA Attestation', desc: 'Ministry of Foreign Affairs Pakistan' },
        { icon: 'fa-file-text', title: 'IBCC Attestation', desc: 'For matric/intermediate certificates' },
        { icon: 'fa-legal', title: 'Apostille', desc: 'Requirements for certain countries' },
        { icon: 'fa-language', title: 'Translation Services', desc: 'Professional translations (English/French/Italian/Spanish)' },
        { icon: 'fa-institution', title: 'Bank Support', desc: 'Legalization and sponsorship letter preparation' },
    ];


    const features = [
        { title: 'University Selection', desc: 'Personalized matching with top-tier global institutions.', icon: 'fa-university' },
        { title: 'Admission Support', desc: 'Expert guidance on applications, SOPs, and interviews.', icon: 'fa-file-text-o' },
        { title: 'Visa Excellence', desc: '99.8% success rate in student visa applications worldwide.', icon: 'fa-shield' },
        { title: 'Scholarship Aid', desc: 'Identifying and securing financial support opportunities.', icon: 'fa-money' }
    ];

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

            {/* Introduction Section */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6 order-lg-2">
                            <Reveal animation="fade-left">
                                <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 uppercase fw-bold">Global Education Experts</span>
                                <h2 className="display-5 fw-bold mb-4">Transforming Your <span className="col_oran">Academic Future</span></h2>
                                <p className="lead text-muted mb-4">
                                    Studying abroad is the most effective way to build a global perspective and unlock unmatched career opportunities.
                                </p>
                                <p className="mb-5 text-muted">
                                    At Infinity Overseas Consultants (IOC), we bridge the gap between ambitious students and the world's most prestigious universities. We provide a clear, stress-free path to your international academic dreams.
                                </p>
                                <div className="row g-4">
                                        {features.map((item, i) => (
                                            <div key={i} className="col-sm-6">
                                                <Reveal animation="fade-up" delay={i * 0.1}>
                                                    <div className="d-flex flex-column align-items-center text-center p-4 rounded-4 bg-light shadow-sm transition hover-lift border-0 h-100">
                                                        <div className="icon-circle-premium bg_oran text-white mb-3" style={{ width: '50px', height: '50px', borderRadius: '15px' }}>
                                                            <i className={`fa ${item.icon} fs-4`}></i>
                                                        </div>
                                                        <h6 className="mb-2 fw-bold">{item.title}</h6>
                                                        <p className="text-muted mb-0 small lh-sm">{item.desc}</p>
                                                    </div>
                                                </Reveal>
                                            </div>
                                        ))}
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-lg-6 order-lg-1">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-2xl" style={{ height: '550px' }}>
                                    <Image
                                        src="/img/study_abroad_service.png"
                                        alt="Study Abroad Success"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="transition"
                                        priority
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white text-center">
                                        <h4 className="fw-bold mb-0 text-white">Faisalabad's #1 Consultants</h4>
                                        <p className="small mb-0 opacity-75">Join thousand of successful students today.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admission Destinations */}
            <section className="p_5 bg-light">
                <div className="container-xl py-5">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green fw-bold text-uppercase letter-spacing-2 mb-3">ADMISSION PORTFOLIO</h4>
                                <h2 className="display-5 fw-bold mb-0">Partnered <span className="col_oran">Admissions</span> Worldwide</h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {admissionRegions.map((r, i) => (
                            <div key={i} className="col-md-6 col-lg-4">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="service-card-premium">
                                        <div className={`icon-circle-premium ${r.color} text-white`}>
                                            <i className={`fa ${r.icon} fs-4`}></i>
                                        </div>
                                        <h4 className="fw-bold mb-1">{r.region}</h4>
                                        {r.subtitle && <p className="small text-muted mb-4">{r.subtitle}</p>}
                                        <ul className="list-unstyled mb-0">
                                            {r.items.map((item, j) => (
                                                <li key={j} className="d-flex align-items-start mb-2">
                                                    <i className="fa fa-caret-right col_green me-2 mt-1"></i>
                                                    <span className="text-muted small">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visa Services */}
            <section className="p_5 bg-white">
                <div className="container-xl py-5">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_oran fw-bold text-uppercase letter-spacing-2 mb-3">VISA EXPERTISE</h4>
                                <h2 className="display-5 fw-bold mb-0">Hassle-Free <span className="col_oran">Student Visas</span></h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <Reveal animation="fade-right" className="h-100">
                                <div className="service-card-premium bg-light-soft">
                                    <div className="icon-circle-premium bg_blue text-white">
                                        <i className="fa fa-shield fs-4"></i>
                                    </div>
                                    <h4 className="fw-bold mb-2">Schengen Student Visas</h4>
                                    <p className="text-muted mb-4 small opacity-75">Comprehensive support for Type D Long-stay admissions for 27+ European nations.</p>
                                    <div className="row g-2">
                                        {schengenItems.map((item, i) => (
                                            <div key={i} className="col-12 d-flex align-items-start mb-2">
                                                <i className="fa fa-check-circle col_green me-2 mt-1"></i>
                                                <span className="text-muted small">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-lg-6">
                            <Reveal animation="fade-left" className="h-100">
                                <div className="service-card-premium">
                                    <div className="icon-circle-premium bg_oran text-white">
                                        <i className="fa fa-globe fs-4"></i>
                                    </div>
                                    <h4 className="fw-bold mb-4">Region-Specific Visas</h4>
                                    <div className="space-y-4">
                                        {nonSchengenVisas.map((v, i) => (
                                            <div key={i} className="mb-3">
                                                <span className="country-tag">{v.country}</span>
                                                <span className="text-muted small d-block mt-2 ps-1 border-start border-2">{v.detail}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Document Services */}
            <section className="p_5 bg-light">
                <div className="container-xl py-5">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green fw-bold text-uppercase letter-spacing-2 mb-3">DOCUMENT PREREQUISITES</h4>
                                <h2 className="display-5 fw-bold mb-0">Legalization & <span className="col_oran">Attestation</span></h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {documentServices.map((doc, i) => (
                            <div key={i} className="col-md-6 col-lg-4">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="service-card-premium text-center">
                                        <div className="icon-circle-premium bg-white border border-light mx-auto">
                                            <i className={`fa ${doc.icon} fs-4 col_blue`}></i>
                                        </div>
                                        <h5 className="fw-bold mb-2">{doc.title}</h5>
                                        <p className="text-muted small mb-0">{doc.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Box */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <Reveal animation="scale-in">
                        <div className="cta-box-premium text-center">
                            <h2 className="display-4 fw-bold mb-3 text-white">Begin Your Journey Today</h2>
                            <p className="lead text-white opacity-75 mb-5 mx-auto" style={{ maxWidth: '700px' }}>
                                Expert guidance is just a click away. Let us handle the complexity of admissions while you focus on your bright future abroad.
                            </p>
                            <div className="d-flex flex-wrap justify-content-center gap-4">
                                <Magnetic>
                                    <Link href="/consultation" className="btn bg_oran text-white px-5 py-3 rounded-pill fw-bold shadow-lg pulse-button border-2 border-transparent transition">
                                        Book Free Consultation <i className="fa fa-calendar ms-2"></i>
                                    </Link>
                                </Magnetic>
                                <Magnetic>
                                    <a href="tel:+923264571906" className="btn btn-outline-light px-5 py-3 rounded-pill fw-bold border-2 transition">
                                        <i className="fa fa-phone me-2"></i> Call for Queries
                                    </a>
                                </Magnetic>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
