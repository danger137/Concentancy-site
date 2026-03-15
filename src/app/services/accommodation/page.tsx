import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Student Accommodation Services Abroad | Infinity Overseas Faisalabad",
    description: "Find safe and affordable student housing in UK, USA, Canada, and Europe. We help international students secure on-campus and private rentals near top universities.",
    keywords: ["student accommodation abroad", "study abroad housing Faisalabad", "student apartments UK Canada", "Infinity Overseas settlement"],
};

export default function Accommodation() {
    const features = [
        { title: 'On-Campus Housing', desc: 'Direct assistance in securing university dormitories.', icon: 'fa-university' },
        { title: 'Private Apartments', desc: 'Finding safe, vetted private rentals near your campus.', icon: 'fa-building-o' },
        { title: 'Shared Living', desc: 'Cost-effective shared housing with other international students.', icon: 'fa-handshake-o' },
        { title: 'Short-term Stays', desc: 'Secure temporary housing for your first weeks abroad.', icon: 'fa-calendar' }
    ];

    const processSteps = [
        { title: 'Preferences', desc: 'We discuss your budget, location, and lifestyle needs.' },
        { title: 'Options Search', desc: 'Our team scans vetted housing networks for the best matches.' },
        { title: 'Virtual Tours', desc: 'Assisting with video tours and detailed property verification.' },
        { title: 'Booking Confirmation', desc: 'Handling contracts and payments to secure your stay.' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/accommodation_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="display-4 fw-bold text-white h-100 w-100">Student Accommodation Services</h1>
                                <h2 className="fs-4 opacity-75 mb-0 fw-medium">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services">Services</Link> <span className="mx-2">/</span> Accommodation
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
                                    <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 uppercase fw-bold">Safe Housing Experts</span>
                                    <h2 className="display-5 fw-bold mb-4">Your Home <span className="col_oran">Away From Home</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Finding a safe and comfortable place to stay is the first step to feeling at home in a new country. We make your transition effortless.
                                    </p>
                                    <p className="mb-4">
                                        At Infinity Overseas Consultants (IOC), we take the stress out of the housing search. We leverage our network of trusted student accommodation providers across the UK, USA, Canada, and Europe to find you a home that is safe, convenient, and within your budget.
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
                                        src="/img/accommodation_service.png"
                                        alt="Safe and Secure Student Accommodation Abroad"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="hover-zoom transition"
                                        priority
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white">
                                        <h4 className="fw-bold mb-0 text-white">Safe & Secure Stays</h4>
                                        <p className="small mb-0 opacity-75">100% verified housing options for peace of mind.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Accommodation Video Section */}
            <section className="p_5 bg-white pt-0">
                <div className="container-xl">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 order-md-1">
                            <Reveal animation="fade-right">
                                <div className="ps-md-4">
                                    <h2 className="display-6 fw-bold mb-4">Discover Your Perfect <span className="col_oran">Student Life</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Your accommodation is more than just a place to sleep; it's where you'll make friends, study for exams, and build your new life abroad.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-coffee col_blue fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Enjoy vibrant communal spaces and student events</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-shield col_green fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Live with 24/7 security and modern amenities</span>
                                        </li>
                                        <li className="d-flex align-items-center mb-3">
                                            <Magnetic><i className="fa fa-map-marker col_oran fs-4 me-3"></i></Magnetic>
                                            <span className="fw-bold">Stay central and close to your university campus</span>
                                        </li>
                                    </ul>
                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-2">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-lg border-bottom border-5 border-warning" style={{ height: '450px' }}>
                                    <LazyVideo
                                        src="/accommodation.mp4"
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                                        <h4 className="fw-bold mb-1 text-white">Live. Learn. Connect.</h4>
                                        <p className="small mb-0 opacity-100">Experience premium student living tailored just for you.</p>
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
                                <h4 className="col_green uppercase fw-bold mb-2">HOUSING JOURNEY</h4>
                                <h2 className="display-6 fw-bold">How We Find Your <span className="col_oran">Perfect Stay</span></h2>
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
                                                <i className="fa fa-key fs-4"></i>
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
                                            <h5 className="fw-bold mb-1">Vetted Providers</h5>
                                            <p className="text-muted small">We only work with housing providers who meet our rigorous safety standards.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-4">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Campus Proximity</h5>
                                            <p className="text-muted small">We prioritize housing within walking distance or easy commute to your university.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Affordable Pricing</h5>
                                            <p className="text-muted small">Access to exclusive student discounts and cost-effective living arrangements.</p>
                                        </div>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                        <div className="col-md-6">
                            <Reveal animation="scale-in">
                                <div className="p-5 rounded-4 bg_blue text-white shadow-lg">
                                    <h3 className="fw-bold mb-3 h2 text-white">Find Your Ideal Home Abroad</h3>
                                    <p className="opacity-75 mb-4">Don't wait until you arrive. Book your accommodation early to secure the best locations and rates. Our housing experts are ready to help.</p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Magnetic>
                                            <Link href="/consultation" className="btn bg_oran text-white px-4 py-3 rounded-pill fw-bold shadow hover-up pulse-button">
                                                Find My Stay <i className="fa fa-arrow-right ms-2"></i>
                                            </Link>
                                        </Magnetic>
                                        <Magnetic>
                                            <a href="tel:+923264571906" className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold">
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
