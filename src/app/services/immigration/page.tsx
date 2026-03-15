import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Immigration Consultants in Faisalabad | PR & Settlement | Infinity Overseas",
    description: "Expert immigration services for Canada (Express Entry), Australia, and UK. Get your Permanent Residency (PR) with Faisalabad's most trusted immigration consultants.",
    keywords: ["immigration consultant Faisalabad", "Canada PR from Pakistan", "Australia skilled immigration Pakistan", "Infinity Overseas immigration"],
};

export default function Immigration() {
    const features = [
        { title: 'Eligibility Assessment', desc: 'Detailed analysis of your PR points and pathways.', icon: 'fa-calculator' },
        { title: 'Professional Filing', desc: 'Error-free visa application and documentation support.', icon: 'fa-folder-open-o' },
        { title: 'Pathways Guidance', desc: 'Express Entry, PNPs, and skilled worker streams.', icon: 'fa-map-o' },
        { title: 'Family Sponsorship', desc: 'Bringing your loved ones together in your new home.', icon: 'fa-users' }
    ];

    const processSteps = [
        { title: 'Profile Analysis', desc: 'We evaluate your age, education, and work experience for eligibility.', icon: 'fa-search' },
        { title: 'Strategic Roadmap', desc: 'Selecting the immigration stream that offers the best success rate.', icon: 'fa-map-signs' },
        { title: 'Documentation', desc: 'Expert assistance in gathering and verifying all required papers.', icon: 'fa-file-text' },
        { title: 'Submission & Tracking', desc: 'Managing the entire application process until your PR is granted.', icon: 'fa-paper-plane' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/immigration_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="display-4 fw-bold text-white h-100 w-100">Immigration Consultants in Faisalabad</h1>
                                <h2 className="fs-4 opacity-75 mb-0 fw-medium">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services">Services</Link> <span className="mx-2">/</span> Immigration
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
                                    <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 uppercase fw-bold">Permanent Residency Experts</span>
                                    <h2 className="display-5 fw-bold mb-4">Start Your Journey to <span className="col_oran">Global Citizenship</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Relocating to a new country is a monumental decision. We provide the expertise and support needed to make your immigration journey successful.
                                    </p>
                                    <p className="mb-4">
                                        At Infinity Overseas Consultants (IOC), we specialize in permanent residency pathways for Canada, Australia, the UK, and Europe. Our licensed experts navigate the complex immigration laws so you can focus on your future abroad.
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
                                        src="/img/immigration_service.png"
                                        alt="Faisalabad's Top Immigration Consultants - PR Success"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="hover-zoom transition"
                                        priority
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white">
                                        <h4 className="fw-bold mb-0 text-white">99.8% Success Rate</h4>
                                        <p className="small mb-0 opacity-75">Trust the experts with your family's future.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Immigration Video Section */}
            <section className="p_5 bg-white pt-0">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-1">
                            <Reveal animation="fade-right">
                                <div className="ps-md-4">
                                    <h2 className="display-6 fw-bold mb-4">Build Your <span className="col_oran">New Life</span> Today</h2>
                                    <p className="lead text-muted mb-4">
                                        Immigration is more than just crossing borders; it's about setting roots, securing your family's future, and finding endless growth in a brand new environment.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-home col_blue fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Establish a permanent home for your family</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-briefcase col_green fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Unlock high-paying global career prospects</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-heartbeat col_oran fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Enjoy world-class healthcare and security</span>
                                        </li>
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-2">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-lg border-bottom border-5 border-warning" style={{ height: '450px' }}>
                                    <LazyVideo
                                        src="/imageration.mp4"
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <h4 className="fw-bold mb-1 text-white">A Future Without Limits</h4>
                                        <p className="small mb-0 opacity-100">Step into your new destiny with absolute confidence.</p>
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
                                <h4 className="col_green uppercase fw-bold mb-2">IMMIGRATION PATHWAY</h4>
                                <h2 className="display-6 fw-bold">Strategic Steps to <span className="col_oran">Your New Home</span></h2>
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
                                            <div className="mb-3 d-inline-flex align-items-center justify-content-center rounded-circle bg_blue text-white shadow-sm" style={{ width: '80px', height: '80px' }}>
                                                <i className={`fa ${step.icon} fs-4`}></i>
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

            {/* Country Specific Immigration */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <div className="row text-center mb-5 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green uppercase fw-bold">TOP DESTINATIONS</h4>
                                <h2 className="display-6 fw-bold">Country-Specific <span className="col_oran">Immigration Solutions</span></h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {[
                            { name: 'Canada', path: '/services/immigration/canada', desc: 'Express Entry, PNP, and Family Sponsorship.', flag: '🇨🇦' },
                            { name: 'Australia', path: '/services/immigration/australia', desc: 'Skilled Independent and State Nominated Visas.', flag: '🇦🇺' },
                            { name: 'United Kingdom', path: '/services/immigration/uk', desc: 'Skilled Worker and Innovator Founder pathways.', flag: '🇬🇧' }
                        ].map((country, i) => (
                            <div key={i} className="col-md-4">
                                <Reveal animation="fade-up" delay={i * 0.1}>
                                    <div className="p-4 rounded-4 border shadow-sm hover-shadow-lg hover-lift transition-all bg-light">
                                        <div className="display-4 mb-3">{country.flag}</div>
                                        <h4 className="fw-bold mb-3">{country.name}</h4>
                                        <p className="text-muted small mb-4">{country.desc}</p>
                                        <Magnetic>
                                            <Link href={country.path} className="btn btn-outline-success rounded-pill px-4">
                                                View Details <i className="fa fa-arrow-right ms-2"></i>
                                            </Link>
                                        </Magnetic>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="p_5 bg-light overflow-hidden">
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
                                            <h5 className="fw-bold mb-1">Licensed Consultants</h5>
                                            <p className="text-muted small">Our team stays updated with the latest immigration policies and regulations.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-4">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">High Approval Rate</h5>
                                            <p className="text-muted small">We only take cases with a realistic chance of success, maintaining our reputation.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Settlement Assistance</h5>
                                            <p className="text-muted small">We help you with post-landing services to ensure you settle easily in your new country.</p>
                                        </div>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                        <div className="col-md-6">
                            <Reveal animation="scale-in">
                                <div className="p-5 rounded-4 bg_blue text-white shadow-lg position-relative overflow-hidden">
                                    <div className="position-absolute end-0 top-0 opacity-10 mt-n4 me-n4">
                                        <i className="fa fa-globe" style={{ fontSize: '200px' }}></i>
                                    </div>
                                    <div className="position-relative z-index-1">
                                        <h3 className="fw-bold mb-3 h2 text-white">Check Your Eligibility Today</h3>
                                        <p className="opacity-75 mb-4">Every case is unique. Get a personalized assessment from our senior immigration consultants and find the fastest pathway for you.</p>
                                        <div className="d-flex flex-wrap gap-3">
                                            <Magnetic>
                                                <Link href="/consultation" className="btn bg_oran text-white px-4 py-3 rounded-pill fw-bold shadow hover-up pulse-button">
                                                    Check My PR Eligibility <i className="fa fa-arrow-right ms-2"></i>
                                                </Link>
                                            </Magnetic>
                                            <Magnetic>
                                                <a href="tel:+923264571906" className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold">
                                                    <i className="fa fa-phone me-2"></i> Talk to Expert
                                                </a>
                                            </Magnetic>
                                        </div>
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
