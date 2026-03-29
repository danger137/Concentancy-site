"use client";
import Link from 'next/link';
import { useState, useRef } from 'react';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import { countries } from '@/data/countries';

export default function StudyAbroadDestinations() {
    const [activeCategory, setActiveCategory] = useState<'All' | 'Asian' | 'European' | 'Schengen'>('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const detailRef = useRef<HTMLDivElement>(null);

    const selectedCountry = countries.find(c => c.id === selectedId);

    const handleCountryClick = (id: string) => {
        setSelectedId(id);
        // Scroll to details after a short delay for state update
        setTimeout(() => {
            detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    return (
        <div className="destinations-section">
            {/* Category Cards */}
            <section className="bg-light py-5 border-bottom">
                <div className="container-xl">
                    <Reveal animation="fade-down">
                        <div className="row g-4 justify-content-center">
                            {[
                                { id: 'All', title: 'All Destinations', icon: 'fa-globe', count: countries.length },
                                { id: 'Asian', title: 'Asian Countries', icon: 'fa-map-marker', count: countries.filter(c => c.isAsian).length },
                                { id: 'European', title: 'European Countries', icon: 'fa-university', count: countries.filter(c => c.isEuropean).length },
                                { id: 'Schengen', title: 'Schengen Area', icon: 'fa-flag', count: countries.filter(c => c.isSchengen).length },
                            ].map(cat => (
                                <div key={cat.id} className="col-12 col-sm-6 col-lg-3">
                                    <div 
                                        className={`card h-100 border-0 shadow-sm transition hover-lift cursor-pointer`}
                                        onClick={() => { setActiveCategory(cat.id as any); setSelectedId(null); }}
                                        style={{ 
                                            borderRadius: '12px', 
                                            borderLeft: activeCategory === cat.id ? '5px solid #FF7700' : '5px solid transparent',
                                            transform: activeCategory === cat.id ? 'translateY(-5px)' : 'none',
                                            boxShadow: activeCategory === cat.id ? '0 10px 20px rgba(0,0,0,0.1)' : ''
                                        }}
                                    >
                                        <div className="card-body d-flex align-items-center p-3 p-md-4">
                                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 bg-light" style={{ width: '48px', height: '48px', minWidth: '48px' }}>
                                                <i className={`fa ${cat.icon} fs-4 ${activeCategory === cat.id ? 'col_oran' : 'text-secondary'}`}></i>
                                            </div>
                                            <div>
                                                <h6 className={`fw-bold mb-1 ${activeCategory === cat.id ? 'col_oran' : 'text-dark'}`}>{cat.title}</h6>
                                                <span className="text-muted small">{cat.count} Destinations</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Premium Country Grid */}
            <section className="bg-white py-5">
                <div className="container-xl">
                    <Reveal animation="fade-up">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                            {countries.filter(c => {
                                if (activeCategory === 'All') return true;
                                if (activeCategory === 'Asian') return c.isAsian;
                                if (activeCategory === 'European') return c.isEuropean;
                                if (activeCategory === 'Schengen') return c.isSchengen;
                                return true;
                            }).map((country) => (
                                <div key={country.id} className="col">
                                    <div 
                                        className={`position-relative rounded-4 overflow-hidden shadow-sm transition hover-lift cursor-pointer ${selectedId === country.id ? 'ring-oran' : ''}`}
                                        style={{ height: '300px', cursor: 'pointer', border: selectedId === country.id ? '3px solid #FF7700' : 'none' }}
                                        onClick={() => handleCountryClick(country.id)}
                                    >
                                        {/* Background Image */}
                                        <div 
                                            className="position-absolute inset-0 transition transform hover-scale"
                                            style={{ 
                                                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url("${country.img}")`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        ></div>
                                        
                                        {/* Content Overlay */}
                                        <div className="position-absolute inset-0 d-flex flex-column justify-content-center align-items-center text-center p-3">
                                            <h3 className="text-white fw-bold text-uppercase ls-1 m-0 mb-2" style={{ textShadow: '0 4px 15px rgba(0,0,0,0.6)', fontSize: '1.6rem' }}>
                                                {country.name}
                                            </h3>
                                            <div className="d-flex align-items-center justify-content-center px-4 py-2 rounded-pill bg-white text-dark small fw-bold shadow">
                                                <span className="me-2 text-dark opacity-75">{country.code}</span>
                                                <span className="text-uppercase ls-1" style={{ fontSize: '0.75rem' }}>View</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Interactive Detail Section */}
            <div ref={detailRef}>
                {selectedCountry && (
                    <section className="p_5 bg-light border-top animation-fade-in">
                        <div className="container-xl">
                            <div className="row g-5 align-items-start">
                                {/* Left: Country Title + Why */}
                                <div className="col-lg-5">
                                    <Reveal animation="fade-right">
                                        <div className="position-sticky" style={{ top: '100px' }}>
                                            <span className="d-inline-block mb-3" style={{ fontSize: '3.5rem', lineHeight: 1 }}>{selectedCountry.flag}</span>
                                            <h2 className="display-5 fw-bold mb-3">{selectedCountry.name}</h2>
                                            <div className="mb-4" style={{ width: '60px', height: '4px', borderRadius: '2px', background: selectedCountry.color }}></div>
                                            <p className="text-muted lh-lg mb-4" style={{ fontSize: '1.05rem' }}>{selectedCountry.why}</p>
                                            <div className="d-flex align-items-center gap-3 mb-3">
                                                <Magnetic>
                                                    <Link href="/consultation" className={`btn ${selectedCountry.accentClass} text-white px-4 py-3 rounded-pill fw-bold shadow-sm border-0 hover-up transition`}>
                                                        Apply Now <i className="fa fa-arrow-right ms-2"></i>
                                                    </Link>
                                                </Magnetic>
                                                <button 
                                                    onClick={() => setSelectedId(null)} 
                                                    className="btn btn-outline-dark px-4 py-3 rounded-pill fw-bold transition"
                                                >
                                                    View All Countries
                                                </button>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>

                                {/* Right: What We Offer + Courses */}
                                <div className="col-lg-7">
                                    <Reveal animation="fade-up" delay={0.15}>
                                        {/* What We Offer Card */}
                                        <div className="bg-white rounded-4 border shadow-sm p-4 p-md-5 mb-4 hover-lift transition">
                                            <h5 className="fw-bold mb-4 d-flex align-items-center">
                                                <span className={`d-inline-flex align-items-center justify-content-center rounded-circle ${selectedCountry.accentClass} text-white me-3 shadow-sm`} style={{ width: '45px', height: '45px', minWidth: '45px' }}>
                                                    <i className={`fa ${selectedCountry.icon}`}></i>
                                                </span>
                                                What We Offer
                                            </h5>
                                            <ul className="mb-0 ps-0" style={{ listStyle: 'none' }}>
                                                {selectedCountry.offers.map((item, i) => (
                                                    <li key={i} className="d-flex align-items-start mb-3">
                                                        <i className="fa fa-check-circle col_green mt-1 me-3 flex-shrink-0"></i>
                                                        <span className="text-muted" style={{ fontSize: '0.95rem' }}>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Popular Courses Card */}
                                        <div className="rounded-4 border shadow-sm p-4 hover-lift transition" style={{ background: `linear-gradient(135deg, ${selectedCountry.color}08, ${selectedCountry.color}15)` }}>
                                            <h6 className="fw-bold mb-3">
                                                <i className="fa fa-graduation-cap col_oran me-2"></i>
                                                Popular Courses
                                            </h6>
                                            <div className="d-flex flex-wrap gap-2">
                                                {selectedCountry.courses.split(', ').map((course, i) => (
                                                    <span key={i} className="badge bg-white text-dark border px-3 py-2 rounded-pill fw-medium shadow-sm" style={{ fontSize: '0.8rem' }}>
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Note if exists */}
                                        {(selectedCountry as any).note && (
                                            <div className="mt-3 p-3 bg-warning bg-opacity-10 border border-warning border-opacity-25 rounded-3">
                                                <small className="text-muted fw-bold"><i className="fa fa-info-circle col_oran me-2"></i>{(selectedCountry as any).note}</small>
                                            </div>
                                        )}
                                    </Reveal>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>

            {/* CTA Section from Destinations */}
            <section className="p_5 bg-white">
                <div className="container-xl px-3">
                    <Reveal animation="scale-in">
                        <div className="dest-cta-box bg_blue rounded-4 text-white text-center position-relative overflow-hidden">
                            <div className="dest-globe position-absolute end-0 top-0 me-n4 mt-n4" style={{ opacity: 0.05 }}>
                                <i className="fa fa-globe" style={{ fontSize: '250px' }}></i>
                            </div>
                            
                            <div className="position-relative py-5 px-3 px-md-4" style={{ zIndex: 10 }}>
                                <h2 className="display-4 fw-bold mb-3 text-white">Ready to Study Abroad?</h2>
                                <p className="cta-para text-white mx-auto mb-5">
                                    With partnerships across 200+ universities globally and specialized expertise in student visas, your pathway to success starts here.
                                </p>
                                <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 w-100" style={{ gap: '1.25rem' }}>
                                    <div className="cta-magnetic-wrapper">
                                        <Magnetic>
                                            <Link href="/consultation" className="btn btn-dest-cta bg_oran text-white rounded-pill fw-bold shadow-lg pulse-button transition-all">
                                                Book Free Consultation <i className="fa fa-calendar ms-2"></i>
                                            </Link>
                                        </Magnetic>
                                    </div>
                                    <div className="cta-magnetic-wrapper">
                                        <Magnetic>
                                            <Link href="/contact" className="btn btn-dest-cta btn-outline-light rounded-pill fw-bold transition-all">
                                                Contact Us <i className="fa fa-phone ms-2"></i>
                                            </Link>
                                        </Magnetic>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <style jsx>{`
                .dest-cta-box {
                    box-shadow: 0 30px 60px -12px rgba(7, 41, 77, 0.35);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .cta-para {
                    max-width: 680px;
                    font-size: 1.15rem;
                    line-height: 1.7;
                    opacity: 0.95;
                }
                :global(.btn-dest-cta) {
                    display: inline-flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    height: 64px !important;
                    width: 330px !important;
                    max-width: 100% !important;
                    padding: 0 1.5rem !important;
                    border-radius: 50px !important;
                    font-weight: 700 !important;
                    font-size: 1.15rem !important;
                    text-decoration: none !important;
                    transition: all 0.3s ease !important;
                    border: 2px solid transparent !important;
                    white-space: nowrap !important;
                    flex-shrink: 0 !important;
                }
                :global(.btn-dest-cta.btn-outline-light) {
                    border-color: rgba(255, 255, 255, 0.8) !important;
                }
                :global(.btn-dest-cta.bg_oran) {
                    background-color: #FF7700 !important;
                    border-color: #FF7700 !important;
                }
                :global(.cta-magnetic-wrapper) {
                    width: 330px;
                    max-width: 100%;
                }
                :global(.cta-magnetic-wrapper > div) {
                    width: 100% !important;
                }
                :global(.btn-dest-cta:hover) {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                }
                @media (max-width: 768px) {
                    .display-4 { font-size: 1.95rem !important; }
                    .cta-para { 
                        font-size: 1rem !important; 
                        padding: 0 10px;
                        margin-bottom: 2.5rem !important;
                    }
                    :global(.btn-dest-cta) { 
                        width: 100% !important; 
                        height: 60px !important;
                        font-size: 1.05rem !important;
                    }
                    :global(.cta-magnetic-wrapper) {
                        width: 100% !important;
                    }
                    .py-5 { padding-top: 3.5rem !important; padding-bottom: 3.5rem !important; }
                }
                @media (max-width: 1024px) {
                    .dest-globe { display: none !important; }
                }
                @media (max-width: 350px) {
                    .display-4 { font-size: 1.7rem !important; }
                    .px-3 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
                    .position-relative.py-5 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
                }
            `}</style>
        </div>
    );
}
