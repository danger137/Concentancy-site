import Link from 'next/link';
import EligibilityForm from '@/components/EligibilityForm';
import type { Metadata } from 'next';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import '@/styles/assessment.css';

export const metadata: Metadata = {
    title: "Assessment Form | Infinity Overseas Consultants",
    description: "Check your eligibility for studying abroad with our free assessment form. Get instant results and personalized guidance from Infinity Overseas Consultants.",
    keywords: ["Free Assessment", "Study Abroad Eligibility", "Visa Assessment Form", "Infinity Assessment", "Check Eligibility"],
    alternates: { canonical: 'https://infinityconsultants.pk/assessment' },
    openGraph: {
        title: 'Free Assessment | Infinity Overseas Consultants',
        description: 'Check your eligibility for studying abroad — instant results and personalized guidance.',
        url: 'https://infinityconsultants.pk/assessment',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free Assessment | Infinity Overseas Consultants',
        description: 'Free study abroad eligibility check with instant results.',
    },
};

export default function Assessment() {
    return (
        <>
            {/* Page Header */}
            <section className="assessment-hero text-center text-white position-relative">
                <div className="container-xl position-relative z-index-1">
                    <Reveal animation="fade-down">
                        <h4 className="col_oran fw-bold text-uppercase letter-spacing-2 mb-3">Instant Eligibility Check</h4>
                        <h1 className="display-3 fw-bold mb-4">Assess Your Study Abroad Chances</h1>
                        <p className="fs-5 mx-auto opacity-75 mb-0" style={{ maxWidth: '750px' }}>
                            Take the first step towards your international future. Our AI-driven assessment provides instant feedback on your profile's strength for global universities.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Assessment Form Section */}
            <section className="py-5 mt-n5 position-relative z-index-2">
                <div className="container-xl">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <Reveal animation="scale-in">
                                <div className="card assessment-card border-0 p-4 p-md-5 rounded-4 overflow-hidden shadow-2xl">
                                    <EligibilityForm />
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Take Assessment */}
            <section className="py-5 bg-white">
                <div className="container-xl py-5">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green fw-bold text-uppercase letter-spacing-2 mb-3">WHY TAKE THIS ASSESSMENT</h4>
                                <h2 className="display-5 fw-bold mb-0">Benefits of Our <span className="col_oran">Free</span> Assessment</h2>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row g-4">
                        {[
                            { icon: 'fa-bolt', title: 'Instant Results', desc: 'Get immediate feedback on your eligibility — no waiting, just instant data-driven answers.' },
                            { icon: 'fa-check-square-o', title: 'Expert Review', desc: 'Our team reviews complex cases personally and provides tailored recommendations for you.' },
                            { icon: 'fa-gift', title: '100% Free', desc: 'This assessment is completely free with no hidden charges, obligations, or fees.' },
                            { icon: 'fa-lock', title: 'Secured Data', desc: 'Your information is encrypted and only used to provide you with personalized study guidance.' },
                            { icon: 'fa-map', title: 'Clear Roadmap', desc: 'Receive a step-by-step strategic plan for your study abroad journey based on your results.' },
                            { icon: 'fa-headphones', title: 'Direct Access', desc: 'After your result, get direct priority access to book a free one-on-one session with our top advisors.' },
                        ].map((benefit, i) => (
                            <div key={i} className="col-md-4">
                                <Reveal animation="fade-up" delay={i * 0.1}>
                                    <div className="card benefit-card border-0 p-4 h-100 text-center">
                                        <div className="benefit-icon-wrapper">
                                            <i className={`fa ${benefit.icon} fs-3 col_oran transition`}></i>
                                        </div>
                                        <h5 className="fw-bold mb-2">{benefit.title}</h5>
                                        <p className="text-muted mb-0 lh-base">{benefit.desc}</p>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-5 cta_bg text-white text-center position-relative overflow-hidden">
                <div className="container-xl py-4 position-relative z-index-1">
                    <Reveal animation="scale-in">
                        <h2 className="display-5 fw-bold mb-4">Want a More Detailed Profile Review?</h2>
                        <p className="mt-3 fs-5 opacity-75 max-w-2xl mx-auto mb-5">Join thousands of successful students and get a personalized evaluation from our certified counselors.</p>
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                            <Magnetic>
                                <Link className="btn btn-light text-dark border-0 px-5 py-3 fs-5 fw-bold rounded-pill shadow-lg hover-up transition" href="/consultation">Book Free Personalized Consultation</Link>
                            </Magnetic>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
