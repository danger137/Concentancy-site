import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';
import { Metadata } from 'next';
import StudyAbroadAnimation from '@/components/StudyAbroadAnimation';
import '@/styles/visit-visa.css';

export const metadata: Metadata = {
    title: "Visit & Tourist Visa Services in Faisalabad | Infinity Overseas",
    description: "Expert assistance for tourist and visit visas to UK, USA, Canada, Schengen, and Turkey. Get high approval rates with Faisalabad's top travel consultants.",
    keywords: ["visit visa consultant Faisalabad", "tourist visa UK Pakistan", "Schengen visit visa Pakistan", "Infinity Overseas travel"],
};

export default function VisitVisa() {
    const features = [
        { title: 'Document Review', desc: 'Ensuring your application is complete and error-free.', icon: 'fa-check-square-o' },
        { title: 'Interview Prep', desc: 'Mock interviews to boost your confidence for the embassy.', icon: 'fa-users' },
        { title: 'Itinerary Planning', desc: 'Assistance with flight and hotel bookings for a strong case.', icon: 'fa-globe' },
        { title: 'Speedy Processing', desc: 'Expert tips and fast-track methods for quicker results.', icon: 'fa-bolt' }
    ];

    const processSteps = [
        { title: 'Goal Setting', desc: 'Determining the right visa category based on your travel purpose.' },
        { title: 'File Preparation', desc: 'Gathering and organizing all necessary financial and personal documents.' },
        { title: 'Application Submission', desc: 'Professional handling of the entire online and offline filing process.' },
        { title: 'Visa Approval', desc: 'Final checks and briefing before you receive your passport.' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/visit_visa_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="display-4 fw-bold text-white h-100 w-100">Visit & Tourist Visa Services</h1>
                                <h2 className="fs-4 opacity-75 mb-0 fw-medium">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services">Services</Link> <span className="mx-2">/</span> Visit Visa
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
                                    <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 uppercase fw-bold">Travel Assistance Experts</span>
                                    <h2 className="display-5 fw-bold mb-4">Hassle-Free <span className="col_oran">Global Travel</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Exploring the world should be exciting, not stressful. We handle the complex visa technicalities so you can focus on your trip.
                                    </p>
                                    <p className="mb-4">
                                        Whether it's for a holiday, a family visit, or a business meeting, we provide expert assistance for the UK, USA, Canada, Schengen Area, Thailand, Turkey, and beyond. Our team ensures your application is robust and compliant with the latest embassy requirements.
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
                                        src="/img/visit_visa_service.png"
                                        alt="Faisalabad's Best Visit Visa Consultants - Global Travel Success"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="hover-zoom transition"
                                        priority
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white">
                                        <h4 className="fw-bold mb-0 text-white">Explore New Horizons</h4>
                                        <p className="small mb-0 opacity-75">High approval rates for all major destinations.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Video Section */}
            <section className="p_5 bg-white pt-0">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-1">
                            <Reveal animation="fade-right">
                                <div className="ps-md-4">
                                    <h2 className="display-6 fw-bold mb-4">Discover the World with <span className="col_oran">Confidence</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Whether you're planning a family vacation, a solo adventure, or attending a special event abroad, we ensure your visa process is the least of your worries.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-camera col_blue fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Create unforgettable memories globally</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-users col_green fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Reunite with family and friends abroad</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-map col_oran fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Explore iconic landmarks without stress</span>
                                        </li>
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-2">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-lg border-bottom border-5 border-warning" style={{ height: '450px' }}>
                                    <LazyVideo
                                        src="/visit.mp4"
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <h4 className="fw-bold mb-1 text-white">Travel Made Easy</h4>
                                        <p className="small mb-0 opacity-100">Your gateway to exploring the world stress-free.</p>
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
                                <h4 className="col_green uppercase fw-bold mb-2">VISA PROCESS</h4>
                                <h2 className="display-6 fw-bold">Your Smooth Journey <span className="col_oran">Starts Here</span></h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {processSteps.map((step, i) => (
                            <div key={i} className="col-md-6 col-lg-3">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="p-4 bg-white rounded-4 shadow-sm border h-100 text-center position-relative overflow-hidden transition-all hover-shadow-lg hover-lift d-flex flex-column align-items-center">
                                        <span className="step-number">{i + 1}</span>
                                        <Magnetic>
                                            <div className="mb-3 d-inline-block p-3 rounded-circle bg_blue text-white shadow-sm">
                                                <i className="fa fa-ticket fs-4"></i>
                                            </div>
                                        </Magnetic>
                                        <h5 className="fw-bold mb-3 fs-5">{step.title}</h5>
                                        <p className="text-muted small mb-0">{step.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Animated Journey Section */}
            <section className="p_5 bg-white overflow-hidden">
                <div className="container-xl">
                    <div className="row align-items-center flex-row-reverse">
                        <div className="col-md-6">
                            <Reveal animation="fade-left">
                                <StudyAbroadAnimation />
                            </Reveal>
                        </div>
                        <div className="col-md-6 pe-md-5 pt-4 mt-4 mt-md-0">
                            <Reveal animation="fade-right">
                                <h4 className="col_oran">YOUR JOURNEY</h4>
                                <h2 className="fw-bold mt-2 display-5">Watch Your Dreams Take Flight</h2>
                                <div className="line col_green mb-4"></div>
                                <p className="mt-4 fs-5" style={{ lineHeight: '1.8' }}>
                                    Experience a seamless transition from dreaming about international education to actually boarding your flight. Our immersive animation represents your global journey—from applications to stepping foot in your dream university.
                                </p>
                                <ul className="mt-4 list-unstyled">
                                    <li className="mb-3 d-flex align-items-center">
                                        <Magnetic><i className="fa fa-plane col_blue fs-4 me-3"></i></Magnetic>
                                        <span className="fw-bold">End-to-end admission guidance</span>
                                    </li>
                                    <li className="mb-3 d-flex align-items-center">
                                        <Magnetic><i className="fa fa-globe col_green fs-4 me-3"></i></Magnetic>
                                        <span className="fw-bold">Seamless visa processing</span>
                                    </li>
                                    <li className="mb-3 d-flex align-items-center">
                                        <Magnetic><i className="fa fa-graduation-cap col_oran fs-4 me-3"></i></Magnetic>
                                        <span className="fw-bold">Guaranteed career advancement</span>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                    </div>
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
                                            <h5 className="fw-bold mb-1">Global Expertise</h5>
                                            <p className="text-muted small">Specialized knowledge of visa protocols for over 40+ countries.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-4">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Transparent Guidance</h5>
                                            <p className="text-muted small">Honest feedback on your case profile and approval chances.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Travel Roadmap</h5>
                                            <p className="text-muted small">More than just a visa; we help you plan your travel for a better experience.</p>
                                        </div>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                        <div className="col-md-6">
                            <Reveal animation="scale-in">
                                <div className="p-5 rounded-4 bg_blue text-white shadow-lg">
                                    <h3 className="fw-bold mb-3 h2 text-white">Ready for your next adventure?</h3>
                                    <p className="opacity-75 mb-4">Get a professional opinion on your travel plans. Our visa experts provide a 1-on-1 consultation to evaluate your documents.</p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Magnetic>
                                            <Link href="/consultation" className="btn bg_oran text-white px-4 py-3 rounded-pill fw-bold shadow pulse-button border-2 border-transparent">
                                                Book Consultation <i className="fa fa-arrow-right ms-2"></i>
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <a href="tel:+923264571906" className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold border-2">
                                                <i className="fa fa-phone me-2"></i> Get Expert Help
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

