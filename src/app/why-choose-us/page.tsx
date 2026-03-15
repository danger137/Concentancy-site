import Link from 'next/link';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';

export default function WhyChooseUs() {
    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12">
                            <Reveal animation="fade-down">
                                <h1 className="text-white">Why Us</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Why Us
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="why-choose-us" className="p_5 bg-white">
                <div className="container-xl">
                    <div className="row feature_1 text-center mb-5 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green uppercase fw-bold">Why Us</h4>
                                <h1 className="display-4 fw-bold mb-0 col_oran">Key Differentiators</h1>
                                <div className="mt-5">
                                    <h1 className="display-4 fw-bold mb-0">OUR TOP SERVICES FOR Studies</h1>
                                    <p className="mt-3 lead text-muted max-w-2xl mx-auto">We don't just process applications; we architect your European educational journey with specialized expertise and dedicated support.</p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                icon: "fa-search-plus",
                                title: "Counselling",
                                desc: "With our expert guidance and personalized support, we help you navigate your educational journey"
                            },
                            {
                                icon: "fa-user-circle-o",
                                title: "Profile Assessments",
                                desc: "Comprehensive evaluation of your academic background and goals to identify the most suitable global opportunities"
                            },
                            {
                                icon: "fa-university",
                                title: "University",
                                desc: "University selection help for students to find top institutions for higher education abroad"
                            },
                            {
                                icon: "fa-list-ul",
                                title: "Courses",
                                desc: "Personalized course selection assistance for students to choose the right program for their future"
                            },
                            {
                                icon: "fa-globe",
                                title: "Visa Application",
                                desc: "Visa application support for students, ensuring a hassle-free process for studying overseas"
                            },
                            {
                                icon: "fa-graduation-cap",
                                title: "Scholarship",
                                desc: "Information on scholarships for students to study abroad, making education more affordable"
                            },
                            {
                                icon: "fa-handshake-o",
                                title: "Support",
                                desc: "24/7 support for students, providing guidance throughout their study abroad journey"
                            },
                            {
                                icon: "fa-plane",
                                title: "Traveling",
                                desc: "Travel assistance for students, ensuring smooth arrangements for flights and accommodations abroad"
                            }
                        ].map((item, i) => (
                            <div key={i} className="col-md-6 col-lg-3">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="feature_2i text-center p-5 h-100 bg-white hover-lift d-flex flex-column align-items-center justify-content-center" 
                                         style={{ 
                                             border: '4px solid #FF7700', 
                                             borderRadius: '30px',
                                             transition: 'all 0.3s ease' 
                                         }}>
                                        <div className="mb-3">
                                            <i className={`fa ${item.icon} col_oran`} style={{ fontSize: '45px' }}></i>
                                        </div>
                                        <h4 className="fw-bold col_oran mb-3">{item.title}</h4>
                                        <p className="mb-0 text-muted" style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '500' }}>{item.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container-xl mt-5 pt-5 border-top">
                    <div className="row feature_1 text-center mb-5 mt-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h1 className="display-4 fw-bold mb-0">OUR TOP SERVICES FOR VISITS</h1>
                                <p className="mt-3 lead text-muted max-w-2xl mx-auto">Expert guidance for your visit visa applications, ensuring a smooth and successful process for your global travels.</p>
                            </Reveal>
                        </div>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                icon: "fa-bullseye",
                                title: "Goal Setting",
                                desc: "Determining the right visa category based on your travel purpose."
                            },
                            {
                                icon: "fa-folder-open",
                                title: "File Preparation",
                                desc: "Gathering and organizing all necessary financial and personal documents."
                            },
                            {
                                icon: "fa-paper-plane",
                                title: "Application Submission",
                                desc: "Professional handling of the entire online and offline filing process."
                            },
                            {
                                icon: "fa-check-square-o",
                                title: "Visa Approval",
                                desc: "Final checks and briefing before you receive your passport."
                            }
                        ].map((item, i) => (
                            <div key={i} className="col-md-6 col-lg-3">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="feature_2i text-center p-5 h-100 bg-white hover-lift d-flex flex-column align-items-center justify-content-center" 
                                         style={{ 
                                             border: '4px solid #FF7700', 
                                             borderRadius: '30px',
                                             transition: 'all 0.3s ease' 
                                         }}>
                                        <div className="mb-3">
                                            <i className={`fa ${item.icon} col_oran`} style={{ fontSize: '45px' }}></i>
                                        </div>
                                        <h4 className="fw-bold col_oran mb-3">{item.title}</h4>
                                        <p className="mb-0 text-muted" style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '500' }}>{item.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container-xl mt-5 pt-5 border-top">
                    <div className="row feature_1 text-center mb-5 mt-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h1 className="display-4 fw-bold mb-0 text-uppercase">Allied Services</h1>
                                <p className="mt-3 lead text-muted max-w-2xl mx-auto">We provide a wide range of essential support services to ensure your transition and stay abroad is completely stress-free.</p>
                            </Reveal>
                        </div>
                    </div>

                    <div className="row g-4">
                        {[
                            {
                                icon: "fa-check-circle",
                                title: "Docs Attestation",
                                desc: "Verification and legalization of your academic and personal documents from relevant authorities."
                            },
                            {
                                icon: "fa-shield",
                                title: "Insurance Coverage",
                                desc: "Comprehensive health and travel insurance plans tailored for international students and travelers."
                            },
                            {
                                icon: "fa-calendar-check-o",
                                title: "Appointments",
                                desc: "Hassle-free booking for VFS, embassy interviews, and biometric collection."
                            },
                            {
                                icon: "fa-ticket",
                                title: "Ticketing",
                                desc: "Assistance with flight bookings and travel arrangements at competitive student rates."
                            },
                            {
                                icon: "fa-calculator",
                                title: "Financial Docs Preparation",
                                desc: "Guidance on proof of funds, bank statements, and financial affidavits for visa requirements."
                            },
                            {
                                icon: "fa-line-chart",
                                title: "Eligibility Assessment",
                                desc: "Detailed analysis of your PR points and pathways."
                            },
                            {
                                icon: "fa-file-text-o",
                                title: "Professional Filing",
                                desc: "Error-free visa application and documentation support."
                            },
                            {
                                icon: "fa-road",
                                title: "Pathways Guidance",
                                desc: "Express Entry, PNPs, and skilled worker streams."
                            },
                            {
                                icon: "fa-users",
                                title: "Family Sponsorship",
                                desc: "Bringing your loved ones together in your new home."
                            }
                        ].map((item, i) => (
                            <div key={i} className="col-md-6 col-lg-3">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="feature_2i text-center p-5 h-100 bg-white hover-lift d-flex flex-column align-items-center justify-content-center" 
                                         style={{ 
                                             border: '4px solid #FF7700', 
                                             borderRadius: '30px',
                                             transition: 'all 0.3s ease' 
                                         }}>
                                        <div className="mb-3">
                                            <i className={`fa ${item.icon} col_oran`} style={{ fontSize: '45px' }}></i>
                                        </div>
                                        <h4 className="fw-bold col_oran mb-3">{item.title}</h4>
                                        <p className="mb-0 text-muted" style={{ fontSize: '1rem', lineHeight: '1.6', fontWeight: '500' }}>{item.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
