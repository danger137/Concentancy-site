import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Canada Immigration Services | PR & Work Visa Experts Faisalabad',
    description: 'Expert guidance for Canada Immigration. Specialized in Express Entry, PNP, and Family Sponsorship. Secure your Canadian PR with Infinity Overseas Faisalabad.',
    keywords: ['Canada Immigration Faisalabad', 'Express Entry consultant', 'Canada PR consultancy', 'PNP Canada experts', 'Infinity Overseas Canada'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/immigration/canada' },
    openGraph: {
        title: 'Canada Immigration | Infinity Overseas Consultants',
        description: 'Secure your Canadian PR with expert guidance on Express Entry and PNP.',
        url: 'https://infinityconsultants.pk/services/immigration/canada',
        images: [{ url: '/img/canada_hero.jpg' }],
    },
};

export default function CanadaImmigration() {
    const pathways = [
        { title: 'Express Entry', desc: 'The fastest way for skilled workers to gain PR in Canada.', categories: ['Federal Skilled Worker', 'Canadian Experience Class', 'Federal Skilled Trades'] },
        { title: 'Provincial Nominee (PNP)', desc: 'Immigrate through a specific province like Ontario, BC, or Alberta.', categories: ['OINP', 'BCPNP', 'SINP', 'MPNP'] },
        { title: 'Family Sponsorship', desc: 'Bring your spouse, children, or parents to join you in Canada.', categories: ['Spousal Sponsorship', 'Parent/Grandparent PGP'] }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/canada_hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4">
                            <h1 className="display-4 fw-bold text-white">Canada Immigration Consultants</h1>
                            <p className="lead text-white-50">Expert PR & Work Visa Guidance from Faisalabad</p>
                            <h4 className="opacity-75 mb-0 fw-bold">
                                <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services/immigration">Immigration</Link> <span className="mx-2">/</span> Canada
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
                            <h2 className="display-6 fw-bold mb-4">Your Future in <span className="col_oran">Canada</span> Starts with IOC</h2>
                            <p className="lead text-muted mb-4">
                                Canada is consistently ranked as one of the best countries in the world to live in. With over 100 immigration pathways, there's a route for almost everyone.
                            </p>
                            <p className="mb-5">
                                At Infinity Overseas (IOC), we simplify the complex Canadian immigration process. Whether you're a skilled professional, a tradesperson, or looking to join family, our RCIC-standard experts provide the legal guidance you need for a successful application in Faisalabad and across Pakistan.
                            </p>

                            <div className="row g-4">
                                {pathways.map((path, i) => (
                                    <div key={i} className="col-md-12">
                                        <div className="p-4 rounded-4 border-start border-5 border-success shadow-sm hover-shadow transition-all bg-light">
                                            <h4 className="fw-bold mb-3">{path.title}</h4>
                                            <p className="text-muted mb-3">{path.desc}</p>
                                            <div className="d-flex flex-wrap gap-2">
                                                {path.categories.map((cat, j) => (
                                                    <span key={j} className="badge bg_blue text-white px-2 py-1">{cat}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="p-4 rounded-4 bg-light shadow-sm sticky-top" style={{ top: '100px' }}>
                                <h4 className="fw-bold mb-4">Start Your Canada PR Case</h4>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">Current CRS Score (if known)</label>
                                    <input type="text" className="form-control" placeholder="Enter score..." />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold">English Proficiency</label>
                                    <select className="form-select">
                                        <option>IELTS/CLB 6</option>
                                        <option>IELTS/CLB 7</option>
                                        <option>IELTS/CLB 8+</option>
                                        <option>Yet to take test</option>
                                    </select>
                                </div>
                                <Link href="/consultation" className="btn bg_oran text-white w-100 py-3 rounded-pill fw-bold shadow mb-3">
                                    Calculate My CRS <i className="fa fa-calculator ms-2"></i>
                                </Link>
                                <p className="text-center small text-muted">A consultant will review your details within 24 hours.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

