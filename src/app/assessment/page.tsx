import Link from 'next/link';
import EligibilityForm from '@/components/EligibilityForm';
import type { Metadata } from 'next';

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
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12">
                            <h1 className="text-white">Assessment Form</h1>
                            <h4 className="col_oran mb-0 fw-bold">
                                <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Assessment Form
                            </h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Intro */}
            <section className="p_3">
                <div className="container-xl">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <h4 className="col_green">FREE ELIGIBILITY CHECK</h4>
                            <h1 className="mb-0"><span className="col_oran fw-normal">Assess Your</span> Study Abroad Chances</h1>
                            <p className="mt-3 mx-auto" style={{ maxWidth: '700px' }}>Take our quick assessment to find out if you qualify for international education. Answer a few simple questions and get instant feedback on your admission and visa prospects.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 overflow-hidden position-relative hover-lift">
                                <EligibilityForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Take Assessment */}
            <section className="p_3 bg-light">
                <div className="container-xl">
                    <div className="row text-center mb-5">
                        <div className="col-md-12">
                            <h4 className="col_green">WHY TAKE THIS ASSESSMENT</h4>
                            <h1 className="mb-0"><span className="col_oran fw-normal">Benefits of</span> Free Assessment</h1>
                        </div>
                    </div>
                    <div className="row">
                        {[
                            { icon: 'fa-clock-o', title: 'Instant Results', desc: 'Get immediate feedback on your eligibility — no waiting, no emails, just instant answers.' },
                            { icon: 'fa-user-md', title: 'Expert Review', desc: 'Our team reviews complex cases personally and provides tailored recommendations.' },
                            { icon: 'fa-money', title: '100% Free', desc: 'This assessment is completely free with no hidden charges or obligations.' },
                            { icon: 'fa-lock', title: 'Confidential', desc: 'Your information is secure and will only be used to provide you with the best guidance.' },
                            { icon: 'fa-road', title: 'Clear Roadmap', desc: 'Based on your results, we provide a step-by-step plan for your study abroad journey.' },
                            { icon: 'fa-comments', title: 'Free Follow-Up', desc: 'After the assessment, book a free consultation to discuss your options in detail.' },
                        ].map((benefit, i) => (
                            <div key={i} className="col-md-4 mb-4">
                                <div className="card border-0 shadow-sm p-4 h-100 text-center hover-lift">
                                    <i className={`fa ${benefit.icon} fa-2x col_oran mb-3`}></i>
                                    <h5 className="fw-bold">{benefit.title}</h5>
                                    <p className="text-muted mb-0 font_14">{benefit.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="p_3 cta_bg text-white text-center">
                <div className="container-xl">
                    <h2 className="fw-bold">Need More Personalized Guidance?</h2>
                    <p className="mt-3 fs-5 cta_desc">Book a free one-on-one consultation with our expert advisors to discuss your profile in detail.</p>
                    <Link className="button bg-white text-black border-white mt-4 d-inline-block px-5 py-3 fs-5 pulse-button" href="/consultation">Book Free Consultation</Link>
                </div>
            </section>
        </>
    );
}
