import Link from 'next/link';
import Image from 'next/image';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import LazyVideo from '@/components/LazyVideo';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "IELTS & English Language Training Faisalabad | Infinity Overseas",
    description: "Best language training center in Faisalabad for IELTS, PTE, and Duolingo. Get certified coaching and hit your target score for study abroad and immigration.",
    keywords: ["IELTS center Faisalabad", "PTE coaching Pakistan", "Duolingo English test Faisalabad", "Infinity Overseas language training"],
};

export default function LanguageCourses() {
    const features = [
        { title: 'IELTS Preparation', desc: 'Expert-led coaching for Academic and General modules to help you achieve a 7.5+ band score.', icon: 'fa-graduation-cap' },
        { title: 'PTE Academic', desc: 'Computer-based training with high-quality mock tests that simulate actual automated scoring.', icon: 'fa-desktop' },
        { title: 'Duolingo English', desc: 'Focused preparation for question types and time management in this modern, adaptive test.', icon: 'fa-language' },
        { title: 'Spoken English', desc: 'Develop native-level fluency and confidence with real-world conversation scenarios.', icon: 'fa-comments-o' }
    ];

    const processSteps = [
        { title: 'Initial Assessment', desc: 'We evaluate your current level to create a customized study plan.', icon: 'fa-edit' },
        { title: 'Expert Coaching', desc: 'Join interactive sessions led by experienced and certified trainers.', icon: 'fa-users' },
        { title: 'Regular Mock Tests', desc: 'Track your progress with real exam simulation and detailed feedback.', icon: 'fa-file-text-o' },
        { title: 'Final Review', desc: 'Focused sessions on weak areas before you take the actual test.', icon: 'fa-check-square' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/language_courses_service.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="display-4 fw-bold text-white h-100 w-100">IELTS & Language Training in Faisalabad</h1>
                                <h2 className="fs-4 opacity-75 mb-0 fw-medium">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services">Services</Link> <span className="mx-2">/</span> Language Training
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
                                    <span className="badge bg_green text-white px-3 py-2 rounded-pill mb-3 uppercase fw-bold">Language Skills Experts</span>
                                    <h2 className="display-5 fw-bold mb-4">Master the Language for <span className="col_oran">Global Success</span></h2>
                                    <p className="lead text-muted mb-4">
                                        Language proficiency is the foundation of a successful international career. We don't just teach for the test; we build your confidence to thrive in a foreign environment.
                                    </p>
                                    <p className="mb-4">
                                        Our instructors at Infinity Overseas Consultants (IOC) are certified experts who understand the nuances of IELTS, PTE, and Duolingo. We provide a supportive learning environment that focuses on your specific needs, whether it's improving your speaking fluency or mastering academic writing.
                                    </p>


                                </div>
                            </Reveal>
                        </div>
                        <div className="col-md-6 order-md-1">
                            <Reveal animation="scale-in">
                                <div className="position-relative rounded-4 overflow-hidden shadow-lg border-bottom border-5 border-success" style={{ height: '500px' }}>
                                    <Image
                                        src="/img/language_courses_service.png"
                                        alt="Best Language Training Center in Faisalabad - IELTS success"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="hover-zoom transition"
                                        priority
                                    />
                                    <div className="position-absolute bottom-0 start-0 w-100 p-4 bg-gradient-dark text-white">
                                        <h4 className="fw-bold mb-0 text-white">99.8% Student Satisfaction</h4>
                                        <p className="small mb-0 opacity-75">Join our community of successful scholars.</p>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Test Modules Section */}
            <section className="p_5 bg-white pt-0 pb-4">
                <div className="container-xl">
                    <div className="row text-center mt-3 g-4">
                        {[
                            {
                                title: 'IELTS Preparation',
                                desc: 'Expert-led coaching for Academic and General modules to help you achieve a 7.5+ band score.',
                                icon: 'fa-graduation-cap',
                                delay: 0.1
                            },
                            {
                                title: 'PTE Academic',
                                desc: 'Computer-based training with high-quality mock tests that simulate actual automated scoring.',
                                icon: 'fa-desktop',
                                delay: 0.2
                            },
                            {
                                title: 'Duolingo English',
                                desc: 'Focused preparation for question types and time management in this modern, adaptive test.',
                                icon: 'fa-language',
                                delay: 0.3
                            },
                            {
                                title: 'Spoken English',
                                desc: 'Develop native-level fluency and confidence with real-world conversation scenarios.',
                                icon: 'fa-comments-o',
                                delay: 0.4
                            }
                        ].map((module, i) => (
                            <div key={i} className="col-md-3 col-6">
                                <Reveal animation="fade-up" delay={module.delay} className="h-100">
                                    <div className="h-100 text-center hover-lift transition">
                                        <Magnetic>
                                            <div className="rounded-4 d-flex align-items-center justify-content-center mx-auto mb-3 shadow-sm" style={{ background: 'linear-gradient(135deg, #FF7700, #ff9533)', width: '100%', aspectRatio: '1/1', maxWidth: '220px' }}>
                                                <i className={`fa ${module.icon} text-white`} style={{ fontSize: '4rem' }}></i>
                                            </div>
                                        </Magnetic>
                                        <h5 className="fw-bold text-dark mb-1 mt-2">{module.title}</h5>
                                        <p className="text-muted small mb-0" style={{ fontSize: '0.82rem', lineHeight: '1.5' }}>{module.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Our Process Section */}
            <section className="p_5 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-4 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green uppercase fw-bold mb-2">OUR METHODOLOGY</h4>
                                <h2 className="display-6 fw-bold">How We Help You <span className="col_oran">Score Higher</span></h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {processSteps.map((step, i) => (
                            <div key={i} className="col-md-3">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="p-4 bg-white rounded-4 shadow-sm border h-100 text-center position-relative overflow-hidden transition-all hover-shadow-lg hover-lift">
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
                                            <h5 className="fw-bold mb-1">Small Batch Sizes</h5>
                                            <p className="text-muted small">We ensure personalized attention for every student by limiting our class sizes.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex mb-4">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Flexible Scheduling</h5>
                                            <p className="text-muted small">Choose between morning, evening, or weekend batches that fit your busy life.</p>
                                        </div>
                                    </li>
                                    <li className="d-flex">
                                        <Magnetic>
                                            <span className="me-3 p-2 rounded-circle border border-2 border-success d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', flexShrink: 0 }}>
                                                <i className="fa fa-check text-success"></i>
                                            </span>
                                        </Magnetic>
                                        <div>
                                            <h5 className="fw-bold mb-1">Lifetime Resources</h5>
                                            <p className="text-muted small">Get access to exclusive study material and practice portals even after your course.</p>
                                        </div>
                                    </li>
                                </ul>
                            </Reveal>
                        </div>
                        <div className="col-md-6">
                            <Reveal animation="scale-in">
                                <div className="p-5 rounded-4 bg_blue text-white shadow-lg">
                                    <h3 className="fw-bold mb-3 h2 text-white">Ready to take the first step?</h3>
                                    <p className="opacity-75 mb-4">Book a free trial class or get a level assessment today. Our counselors are ready to help you map out your success.</p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Magnetic>
                                            <Link href="/consultation" className="btn bg_oran text-white px-4 py-3 rounded-pill fw-bold shadow hover-up pulse-button">
                                                Book Free Assessment <i className="fa fa-arrow-right ms-2"></i>
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

