import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Best Study Abroad Consultants | Infinity Overseas",
    description: "Expert guidance for student visas, university admissions, and scholarships in UK, USA, Canada, and Europe. Partner with Faisalabad's top study abroad consultant.",
    keywords: ["study abroad consultant Faisalabad", "student visa UK Pakistan", "study in Europe from Pakistan", "Infinity Overseas study abroad"],
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

    /* ─── Scholarships ─── */
    const scholarships = [
        { country: '🇬🇧 UK', items: 'Chevening, Commonwealth, GREAT Scholarships, university-specific awards' },
        { country: '🇮🇪 Ireland', items: 'Government of Ireland Scholarships, university merit awards' },
        { country: '🇸🇪 Sweden', items: 'Swedish Institute Scholarships (SISGP), university tuition waivers' },
        { country: '🇩🇰 Denmark', items: 'Danish Government Scholarships, tuition waivers' },
        { country: '🇫🇮 Finland', items: 'Finland Scholarship (tuition fee waiver + €5,000 relocation grant)' },
        { country: '🇭🇺 Hungary', items: 'Stipendium Hungaricum (Full funding including stipend)' },
        { country: '🇹🇷 Turkey', items: 'Türkiye Burslari (Full: tuition + accommodation + stipend + flights)' },
        { country: '🇮🇹 Italy', items: 'DSU Scholarships (based on family income)' },
        { country: '🇫🇷 France', items: 'Eiffel Excellence, university-specific excellence scholarships' },
        { country: '🇱🇹 Lithuania', items: 'Lithuanian Government scholarships' },
        { country: '🇷🇴 Romania', items: 'Romanian Government scholarships (through embassies)' },
        { country: '🇬🇪 Georgia', items: 'University-specific merit scholarships (25-100% tuition waivers)' },
    ];

    /* ─── Document Legalization ─── */
    const documentServices = [
        { icon: 'fa-certificate', title: 'HEC Attestation', desc: 'For degrees (mandatory for all European applications)' },
        { icon: 'fa-institution', title: 'MOFA Attestation', desc: 'Ministry of Foreign Affairs Pakistan' },
        { icon: 'fa-file-text', title: 'IBCC Attestation', desc: 'For matric/intermediate certificates' },
        { icon: 'fa-legal', title: 'Apostille', desc: 'Requirements for certain countries' },
        { icon: 'fa-language', title: 'Translation Services', desc: 'English/French/Italian/Spanish translations of documents' },
        { icon: 'fa-bank', title: 'Bank Statement', desc: 'Legalization and sponsorship letter preparation' },
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
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/study_abroad_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="display-4 fw-bold text-white h-100 w-100">Unlock Your Potential with International Education</h1>
                                <h2 className="fs-4 opacity-75 mb-0 fw-medium">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services">Services</Link> <span className="mx-2">/</span> Study Abroad
                                </h2>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="p_5 bg-white">
                <div className="container-xl d-flex flex-column">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-2">
                            <Reveal animation="fade-left">
                                <div className="ps-md-4">
                                    <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 uppercase fw-bold">Global Education Experts</span>
                                    <h2 className="display-5 fw-bold mb-4">Unlock Your Potential with <span className="col_oran">International Education</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Studying abroad is more than just getting a degree; it's a life-transforming experience that builds global perspective and unmatched career opportunities.
                                    </p>
                                    <p className="mb-4">
                                        At Infinity Overseas Consultants (IOC), we specialize in bridging the gap between ambitious students and the world's most prestigious universities. From the UK and USA to Canada and Europe, we provide a clear, stress-free path to your international academic dreams.
                                    </p>
                                    <div className="row g-4">
                                        {features.map((item, i) => (
                                            <div key={i} className="col-sm-6">
                                                <Reveal animation="fade-up" delay={(i % 2) * 0.1}>
                                                    <div className="d-flex align-items-center p-3 rounded-3 bg-light border-start border-4 border-warning shadow-sm hover-lift transition">
                                                        <Magnetic><i className={`fa ${item.icon} fs-3 col_oran me-3`}></i></Magnetic>
                                                        <div>
                                                            <h5 className="mb-1 fw-bold fs-6">{item.title}</h5>
                                                            <small className="text-muted d-block" style={{ fontSize: '12px', lineHeight: '1.2' }}>{item.desc}</small>
                                                        </div>
                                                    </div>
                                                </Reveal>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-lg border-bottom border-5 border-success" style={{ height: '500px' }}>
                                    <Image
                                        src="/img/study_abroad_service.png"
                                        alt="Faisalabad's Best Study Abroad Consultants - Student Visa Success"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="hover-zoom transition"
                                        priority
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white">
                                        <h4 className="fw-bold mb-0 text-white">Your Future, Our Priority</h4>
                                        <p className="small mb-0 opacity-75">Join 10k+ students who achieved their dreams.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Video Section */}
            <section className="p_5 bg-white pt-0">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-1">
                            <Reveal animation="fade-right">
                                <div className="ps-md-4">
                                    <h2 className="display-6 fw-bold mb-4">Experience the <span className="col_oran">Student Life</span> Abroad</h2>
                                    <p className="lead text-muted mb-4">
                                        Immerse yourself in new cultures, meet people from around the globe, and gain independence. Studying abroad is an adventure that shapes your future.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-graduation-cap col_blue fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Step out of your comfort zone and explore</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-globe col_green fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Build a global network of friends</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-check-circle col_oran fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Discover new career opportunities worldwide</span>
                                        </li>
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-2">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-lg border-bottom border-5 border-warning" style={{ height: '450px' }}>
                                    <LazyVideo
                                        src="/student.mp4"
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <h4 className="fw-bold mb-1 text-white">Live Your Global Dream</h4>
                                        <p className="small mb-0 opacity-100">Experience world-class education and build an international network.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Process Section */}
            <section className="p_5 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-4 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green uppercase fw-bold mb-2">ADMISSION JOURNEY</h4>
                            </Reveal>
                        </div>
                    </div>
                    {/* Inserted from Course Page */}
                    <div className="row text-center mb-5 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 text-uppercase fw-bold">Service 01</span>
                                <h2 className="display-5 fw-bold mb-3">European University <span className="col_oran">Admissions</span></h2>
                                <p className="lead text-muted mx-auto" style={{ maxWidth: '800px', lineHeight: '1.8' }}>We specialize in placing Pakistani students in European universities that offer the perfect balance of quality, affordability, and post-study opportunities.</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {admissionRegions.map((r, i) => (
                            <div key={i} className={i < 3 ? 'col-md-4' : 'col-md-6'}>
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="bg-white rounded-4 border p-4 p-md-5 h-100 shadow-sm hover-lift transition d-flex flex-column">
                                        <div className="d-flex align-items-center mb-4">
                                            <span className={`d-inline-flex align-items-center justify-content-center rounded-circle ${r.color} text-white me-3 shadow-sm`} style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                                                <i className={`fa ${r.icon} fs-5`}></i>
                                            </span>
                                            <div>
                                                <h5 className="fw-bold mb-0">{r.region}</h5>
                                                {r.subtitle && <small className="text-muted">{r.subtitle}</small>}
                                            </div>
                                        </div>
                                        <ul className="mb-0 ps-0" style={{ listStyle: 'none' }}>
                                            {r.items.map((item, j) => (
                                                <li key={j} className="d-flex align-items-start mb-2">
                                                    <i className="fa fa-check-circle col_green mt-1 me-2 flex-shrink-0"></i>
                                                    <span className="text-muted" style={{ fontSize: '0.92rem' }}>{item}</span>
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

            {/* SERVICE 2: Visa Processing */}
            <section id="visa-processing" className="p_5 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-5 mt_5">
                        <div className="col-md-12 mb-4">
                            <Reveal animation="fade-up">
                                <span className="badge bg_oran text-white px-3 py-2 rounded-pill mb-3 text-uppercase fw-bold">Service 02</span>
                                <h2 className="display-5 fw-bold mb-3">Schengen & European <span className="col_oran">Student Visa Processing</span></h2>
                                <p className="lead text-muted mx-auto" style={{ maxWidth: '800px', lineHeight: '1.8' }}>European visa requirements vary significantly by region. Our expertise covers every country and visa type.</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <Reveal animation="fade-right" className="h-100">
                                <div className="bg-white rounded-4 border shadow-sm p-4 p-md-5 h-100 hover-lift transition d-flex flex-column">
                                    <div className="d-flex align-items-center mb-4">
                                        <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg_blue text-white me-3 shadow-sm" style={{ width: '50px', height: '50px' }}>
                                            <i className="fa fa-map fs-5"></i>
                                        </span>
                                        <div>
                                            <h5 className="fw-bold mb-0">Schengen Student Visas</h5>
                                            <small className="text-muted">Sweden, Denmark, Finland, France, Italy, Spain, Malta, Lithuania, Hungary</small>
                                        </div>
                                    </div>
                                    <ul className="mb-0 ps-0" style={{ listStyle: 'none' }}>
                                        {schengenItems.map((item, i) => (
                                            <li key={i} className="d-flex align-items-start mb-3">
                                                <i className="fa fa-check-circle col_green mt-1 me-3 flex-shrink-0"></i>
                                                <span className="text-muted" style={{ fontSize: '0.95rem' }}>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-lg-6">
                            <Reveal animation="fade-left" className="h-100">
                                <div className="bg-white rounded-4 border shadow-sm p-4 p-md-5 h-100 hover-lift transition d-flex flex-column">
                                    <div className="d-flex align-items-center mb-4">
                                        <span className="d-inline-flex align-items-center justify-content-center rounded-circle bg_oran text-white me-3 shadow-sm" style={{ width: '50px', height: '50px' }}>
                                            <i className="fa fa-shield fs-5"></i>
                                        </span>
                                        <h5 className="fw-bold mb-0">Non-Schengen Europe & Dubai</h5>
                                    </div>
                                    <ul className="mb-0 ps-0" style={{ listStyle: 'none' }}>
                                        {nonSchengenVisas.map((v, i) => (
                                            <li key={i} className="d-flex align-items-start mb-3">
                                                <span className="badge bg-light text-dark border me-3 mt-1 flex-shrink-0 fw-bold" style={{ minWidth: '65px', fontSize: '0.75rem' }}>{v.country}</span>
                                                <span className="text-muted" style={{ fontSize: '0.92rem' }}>{v.detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICE 3: Scholarships */}
            <section id="scholarships" className="p_5 bg-white">
                <div className="container-xl">
                    <div className="row text-center mb-5 mt_5">
                        <div className="col-md-12 mb-4">
                            <Reveal animation="fade-up">
                                <span className="badge bg_blue text-white px-3 py-2 rounded-pill mb-3 text-uppercase fw-bold">Service 03</span>
                                <h2 className="display-5 fw-bold mb-3">Scholarship Applications <span className="col_oran">for Europe</span></h2>
                                <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>We handle scholarship applications for 12 European countries &ndash; from fully-funded government programs to university-specific merit awards.</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {scholarships.map((s, i) => (
                            <div key={i} className="col-md-6 col-lg-4">
                                <Reveal animation="fade-up" delay={(i % 3) * 0.1} className="h-100">
                                    <div className="bg-light rounded-4 border p-4 h-100 shadow-sm hover-lift transition d-flex flex-column">
                                        <h6 className="fw-bold mb-2" style={{ fontSize: '1rem' }}>
                                            <span className="me-2">{s.country}</span>
                                        </h6>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>{s.items}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICE 4: Document Legalization */}
            <section id="documents" className="p_5 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-5 mt_5">
                        <div className="col-md-12 mb-4">
                            <Reveal animation="fade-up">
                                <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 text-uppercase fw-bold">Service 04</span>
                                <h2 className="display-5 fw-bold mb-3">Document Legalization <span className="col_oran">for Europe</span></h2>
                                <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>European embassies require specific document attestations. We handle the complete legalization process for you.</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {documentServices.map((doc, i) => (
                            <div key={i} className="col-md-6 col-lg-4">
                                <Reveal animation="fade-up" delay={(i % 3) * 0.1} className="h-100">
                                    <div className="bg-white rounded-4 border p-4 p-md-5 h-100 shadow-sm hover-lift transition text-center d-flex flex-column align-items-center">
                                        <Magnetic>
                                            <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle bg_blue text-white shadow-sm" style={{ width: '65px', height: '65px' }}>
                                                <i className={`fa ${doc.icon} fs-4`}></i>
                                            </div>
                                        </Magnetic>
                                        <h5 className="fw-bold mb-2">{doc.title}</h5>
                                        <p className="text-muted mb-0" style={{ fontSize: '0.92rem' }}>{doc.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <Reveal animation="scale-in">
                        <div className="bg_blue p-5 rounded-4 text-white text-center shadow-2xl position-relative overflow-hidden transition hover-lift">
                            <div className="position-absolute end-0 top-0 opacity-10 me-n4 mt-n4">
                                <i className="fa fa-graduation-cap" style={{ fontSize: '200px' }}></i>
                            </div>
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h2 className="display-4 fw-bold mb-3 text-white">Ready to Study in Europe or UK?</h2>
                                <p className="lead opacity-75 mb-5 mx-auto" style={{ maxWidth: '700px', fontSize: '1.15rem' }}>
                                    From university selection to visa approval &ndash; we handle everything so you can focus on your future. Start with a free consultation today.
                                </p>
                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                    <Magnetic>
                                        <Link href="/consultation" className="btn bg_oran text-white px-5 py-4 rounded-pill fw-bold fs-5 shadow pulse-button border-0">
                                            Book Free Consultation <i className="fa fa-calendar ms-2"></i>
                                        </Link>
                                    </Magnetic>
                                    <Magnetic>
                                        <Link href="/destinations" className="btn btn-outline-light px-5 py-4 rounded-pill fw-bold fs-5 border-2">
                                            Explore Destinations <i className="fa fa-globe ms-2"></i>
                                        </Link>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Why Choose Us Section */}


            <section className="p_5 bg-white overflow-hidden">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6">
                            <Reveal animation="fade-right">
                                <h2 className="display-6 fw-bold mb-4">Why Choose <span className="col_green">Infinity Overseas?</span></h2>
                                <ul className="list-unstyled space-y-4">
                                    <li className="d-flex mb-4">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Direct Partner Networks</h5>
                                            <p className="text-muted small">We have direct links with 500+ top universities, ensuring faster processing.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-4">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Scholarship Expertise</h5>
                                            <p className="text-muted small">Our team excels at securing financial aid to make your education affordable.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">End-to-End Support</h5>
                                            <p className="text-muted small">From first inquiry to pre-departure briefing, we are with you every step.</p>
                                        </div>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                        <div className="col-md-6">
                            <Reveal animation="scale-in">
                                <div className="p-5 rounded-4 bg_blue text-white shadow-lg">
                                    <h3 className="fw-bold mb-3 h2 text-white">Start Your Global Journey Today</h3>
                                    <p className="opacity-75 mb-4">Don't let rejection or confusion stop you. Get a free profile evaluation from our senior consultants and find your path to success.</p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Magnetic>
                                            <Link href="/consultation" className="btn bg_oran text-white px-4 py-3 rounded-pill fw-bold shadow pulse-button">
                                                Get Free Consultation <i className="fa fa-arrow-right ms-2"></i>
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <a href="tel:+923264571906" className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold">
                                                <i className="fa fa-phone me-2"></i> Call Now
                                            </a>
                                        </Magnetic>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

