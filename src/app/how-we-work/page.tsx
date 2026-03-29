import Link from 'next/link';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';

export const metadata = {
    title: 'How We Work - Infinity Overseas Consultant',
    description: 'Learn about our transparent and efficient process for study abroad and immigration services.',
};

export default function HowWeWork() {
    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12">
                            <Reveal animation="fade-down">
                                <h1 className="text-white">How We Work</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> How We Work
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-we-work" className="p_5">
                <div className="container-xl">
                    <div className="row feature_1 text-center mb-5 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green uppercase fw-bold">Our Process</h4>
                                <h1 className="display-4 fw-bold mb-0">Our Structured <span className="col_oran">Working Method</span></h1>
                                <p className="mt-4 lead text-muted mx-auto" style={{ maxWidth: 800 }}>We follow a transparent and efficient process to ensure your international journey is smooth and successful.</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {[
                            {
                                num: "01",
                                title: "European Destination Mapping",
                                highlight: "assessment",
                                icon: "fa-map-marker",
                                color: "col_green",
                                bg: "rgba(46, 202, 127, 0.08)",
                                items: [
                                    { label: "Budget under $5,000/year", detail: "Georgia, Romania, Turkey" },
                                    { label: "Prestigious degrees", detail: "UK, Ireland, Sweden, France" },
                                    { label: "Post-study work priority", detail: "UK, Ireland, France, Germany" },
                                    { label: "No IELTS options", detail: "Cyprus, Georgia, Turkey" }
                                ]
                            },
                            {
                                num: "02",
                                title: "Application Strategy by Region",
                                highlight: "tailored",
                                icon: "fa-send",
                                color: "col_blue",
                                bg: "rgba(59, 52, 255, 0.08)",
                                items: [
                                    { label: "UK & Ireland", detail: "UCAS, Personal Statement crafting" },
                                    { label: "Schengen", detail: "National portal navigation" },
                                    { label: "Eastern Europe", detail: "Simplified direct applications" }
                                ]
                            },
                            {
                                num: "03",
                                title: "Visa Documentation by Embassy",
                                highlight: "guidance",
                                icon: "fa-file-text-o",
                                color: "col_oran",
                                bg: "rgba(255, 119, 0, 0.08)",
                                items: [
                                    { label: "Financial proof", detail: "Blocked accounts, bank statements" },
                                    { label: "Health insurance", detail: "Schengen-compliant policies" },
                                    { label: "Accommodation", detail: "Pre-booked housing support" },
                                    { label: "Interview prep", detail: "Ambassy credibility interviews" }
                                ]
                            },
                            {
                                num: "04",
                                title: "Pre-Departure Briefing",
                                highlight: "orientation",
                                icon: "fa-plane",
                                color: "col_pink",
                                bg: "rgba(255, 44, 123, 0.08)",
                                items: [
                                    { label: "Schengen travel rules", detail: "Visa-free country access info" },
                                    { label: "Part-time work rules", detail: "UK 20hrs, Europe limitations" },
                                    { label: "Housing & Banking", detail: "Opening European bank accounts" }
                                ]
                            }
                        ].map((step, i) => (
                            <div key={i} className="col-md-6">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="p-5 border rounded-4 h-100 bg-white shadow-sm hover-lift transition d-flex flex-column position-relative">
                                        <span className="step-number" style={{ width: '50px', height: '50px', fontSize: '20px', top: '20px', right: '20px' }}>{step.num}</span>
                                        <div className="d-flex align-items-center mb-4">
                                            <div className={`d-inline-flex align-items-center justify-content-center rounded-circle me-3 ${step.color} shadow-sm`} style={{ width: '60px', height: '60px', background: step.bg, fontSize: '24px' }}>
                                                <i className={`fa ${step.icon}`}></i>
                                            </div>
                                            <h4 className="fw-bold mb-0">{step.title}</h4>
                                        </div>
                                        <div className="mb-4 flex-grow-1">
                                            <p className="text-muted" style={{ fontSize: '0.95rem' }}>We provide specialized {step.highlight} for your international journey:</p>
                                        </div>
                                        <ul className="mb-0 ps-0 mt-auto" style={{ listStyle: 'none' }}>
                                            {step.items.map((item, idx) => (
                                                <li key={idx} className="mb-2 d-flex align-items-start">
                                                    <i className={`fa fa-check-circle ${step.color} mt-1 me-2 flex-shrink-0`}></i>
                                                    <span className="text-secondary small">
                                                        <strong className="text-dark">{item.label}:</strong> {item.detail}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>

                    <div className="row mt_5 align-items-center bg_blue p-5 rounded-4 text-white shadow-lg hover-lift transition">
                        <div className="col-lg-8 text-center text-lg-start">
                            <Reveal animation="fade-right">
                                <h2 className="fw-bold mb-3">Ready to start your journey with us?</h2>
                                <p className="mb-0 lead opacity-75">Get in touch today for a transparent, step-by-step guidance to your dream university abroad.</p>
                            </Reveal>
                        </div>
                        <div className="col-lg-4 text-center text-lg-end mt-4 mt-lg-0">
                            <Reveal animation="scale-in">
                                <Magnetic>
                                    <Link href="/consultation" className="btn btn-light text-primary border-0 px-5 py-3 fs-5 fw-bold rounded-pill shadow-sm hover-up">
                                        Get Free Counseling <i className="fa fa-user-md ms-2"></i>
                                    </Link>
                                </Magnetic>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
