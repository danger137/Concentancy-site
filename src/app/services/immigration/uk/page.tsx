import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'UK Immigration Services | Skilled Worker & Innovator Visa Experts',
    description: 'Expert UK Immigration consulting in Faisalabad. Specialized in Skilled Worker, Innovator Founder, and Global Talent visas. 100% legal compliance with Home Office rules.',
    keywords: ['UK Immigration Faisalabad', 'Skilled Worker Visa UK', 'UK Innovator Founder visa', 'UK visa consultant Pakistan', 'Infinity Overseas UK'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/immigration/uk' },
    openGraph: {
        title: 'UK Immigration Experts | Infinity Overseas Consultants',
        description: 'Professional guidance for UK Work and Business visas. Home Office compliant applications.',
        url: 'https://infinityconsultants.pk/services/immigration/uk',
        images: [{ url: '/img/uk_hero.jpg' }],
    },
};

export default function UKImmigration() {
    const pathways = [
        { title: 'Skilled Worker Visa', desc: 'For individuals with a job offer from an approved UK employer.', requirements: ['Job Offer', 'Salary Threshold', 'English B1'] },
        { title: 'Innovator Founder', desc: 'For experienced entrepreneurs seeking to establish a business in the UK.', requirements: ['Innovative Idea', 'Endorsement', 'No Minimum Funds'] },
        { title: 'Global Talent Visa', desc: 'For leaders or potential leaders in academia, research, arts, or digital tech.', requirements: ['Peer Review', 'Exceptional Promise', 'Flexible Working'] }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/uk_hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-white py-4 d-flex flex-column mb-4">
                            <h1 className="display-4 fw-bold text-white">UK Immigration Consultants</h1>
                            <p className="lead text-white">Authorized Guidance for UK Work & Business Visas</p>
                            <h4 className="opacity-75 mb-0 fw-bold">
                                <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services/immigration">Immigration</Link> <span className="mx-2">/</span> UK
                            </h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <div className="row g-5 mt_5">
                        <div className="col-md-7">
                            <h2 className="display-6 fw-bold mb-4">Build Your Career in the <span className="col_oran">United Kingdom</span></h2>
                            <p className="lead text-muted mb-4">
                                The UK's new points-based immigration system provides a clear pathway for talent from all over the world to contribute to its vibrant economy.
                            </p>
                            <p className="mb-5">
                                From the Skilled Worker route to the Innovator Founder visa, we provide comprehensive support including endorsement guidance, employer sponsorship advice, and visa filing at Infinity Overseas (IOC). Our experts ensure your application meets the strict Home Office requirements.
                            </p>

                            <div className="row g-4">
                                {pathways.map((path, i) => (
                                    <div key={i} className="col-md-12">
                                        <div className="p-4 rounded-4 border-start border-5 border-primary shadow-sm hover-shadow transition-all bg-light">
                                            <h4 className="fw-bold mb-3">{path.title}</h4>
                                            <p className="text-muted mb-3">{path.desc}</p>
                                            <div className="d-flex flex-wrap gap-2">
                                                {path.requirements.map((req, j) => (
                                                    <span key={j} className="badge bg_blue text-white px-2 py-1 small">{req}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="p-4 rounded-4 border-2 border-primary border bg-white shadow-lg sticky-top" style={{ top: '100px' }}>
                                <h4 className="fw-bold mb-4">UK Visa Assessment</h4>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Do you have a job offer?</label>
                                    <div className="d-flex gap-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="jobOffer" id="yes" />
                                            <label className="form-check-label" htmlFor="yes">Yes</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="jobOffer" id="no" />
                                            <label className="form-check-label" htmlFor="no">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Highest Qualification</label>
                                    <select className="form-select">
                                        <option>Bachelors</option>
                                        <option>Masters</option>
                                        <option>PhD</option>
                                        <option>Professional Diploma</option>
                                    </select>
                                </div>
                                <Link href="/consultation" className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow mb-3 hover-up">
                                    Book UK Consultation <i className="fa fa-envelope ms-2"></i>
                                </Link>
                                <p className="text-center small text-muted">Legal support for UK Home Office applications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

