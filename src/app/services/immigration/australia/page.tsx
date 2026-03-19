import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Australia Immigration Services | Skilled Independent & PR Experts',
    description: 'Professional Australia Immigration consulting in Faisalabad. Experts in Subclass 189, 190, and 491 visas. Secure your Australia PR with Infinity Overseas Consultants.',
    keywords: ['Australia Immigration Faisalabad', 'Australia PR consultant', '189 visa experts', '190 visa Australia', 'Infinity Overseas Australia'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/immigration/australia' },
    openGraph: {
        title: 'Australia Immigration Experts | Infinity Overseas Consultants',
        description: 'Professional guidance for Australian PR and skilled worker visas.',
        url: 'https://infinityconsultants.pk/services/immigration/australia',
        images: [{ url: '/img/australia_hero.jpg' }],
    },
};

export default function AustraliaImmigration() {
    const pathways = [
        { title: 'Skilled Independent (189)', desc: 'For skilled workers who are not sponsored by an employer or family member.', points: '65+ Points Required' },
        { title: 'Skilled Nominated (190)', desc: 'For skilled workers who are nominated by an Australian state or territory government.', points: 'State Nomination Basis' },
        { title: 'Skilled Work Regional (491)', desc: 'For skilled workers to live and work in regional Australia for up to 5 years.', points: 'Regional Benefit' }
    ];

    return (
        <>
            {/* Hero Section */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(rgba(7, 41, 77, 0.8), rgba(7, 41, 77, 0.8)), url("/img/australia_hero.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-white py-4 d-flex flex-column mb-4">
                            <h1 className="display-4 fw-bold text-white">Australia Immigration Consultants</h1>
                            <p className="lead text-white">Authorized Guidance for Australian PR & Work Visas</p>
                            <h4 className="opacity-75 mb-0 fw-bold">
                                <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <Link className="text-white text-decoration-none" href="/services/immigration">Immigration</Link> <span className="mx-2">/</span> Australia
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
                            <h2 className="display-6 fw-bold mb-4">Discover Life in the <span className="col_oran">Land Down Under</span></h2>
                            <p className="lead text-muted mb-4">
                                Australia offers a high quality of life, a robust economy, and a growing demand for skilled professionals across various sectors.
                            </p>
                            <p className="mb-5">
                                The Australian points-based system (SkillSelect) can be intricate. We provide a full eligibility assessment, document checklist, and professional filing at Infinity Overseas (IOC) to ensure your SkillSelect profile stands out and secures an Invitation to Apply (ITA).
                            </p>

                            <div className="row g-4">
                                {pathways.map((path, i) => (
                                    <div key={i} className="col-md-12">
                                        <div className="p-4 rounded-4 border-start border-5 border-warning shadow-sm hover-shadow transition-all bg-light">
                                            <h4 className="fw-bold mb-3">{path.title}</h4>
                                            <p className="text-muted mb-3">{path.desc}</p>
                                            <span className="badge bg_oran text-white px-3 py-2">{path.points}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-md-5">
                            <div className="p-4 rounded-4 bg_blue text-white shadow-lg sticky-top" style={{ top: '100px' }}>
                                <h4 className="fw-bold mb-4 h3 text-white">Australia PR Assessment</h4>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold opacity-75">Your Occupation (ANZSCO)</label>
                                    <input type="text" className="form-control bg-transparent text-white border-light border-opacity-25" placeholder="e.g. Software Engineer" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold opacity-75">Years of Experience</label>
                                    <select className="form-select bg-transparent text-white border-light border-opacity-25">
                                        <option className="text-dark">Less than 3 years</option>
                                        <option className="text-dark">3 - 5 years</option>
                                        <option className="text-dark">5 - 8 years</option>
                                        <option className="text-dark">8+ years</option>
                                    </select>
                                </div>
                                <Link href="/consultation" className="btn bg_oran text-white w-100 py-3 rounded-pill fw-bold shadow mb-3 hover-up">
                                    Start My Assessment <i className="fa fa-arrow-right ms-2"></i>
                                </Link>
                                <p className="text-center small opacity-75">Certified consultancy standards applied.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

