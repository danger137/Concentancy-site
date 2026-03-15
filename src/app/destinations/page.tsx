"use client";

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import { countries } from '@/data/countries';

export default function DestinationsPage() {
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
        <>
            {/* Hero Banner */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(135deg, rgba(7,41,77,0.92), rgba(30,80,130,0.88)), url("/img/3.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-center text-white py-4">
                            <Reveal animation="fade-down">
                                <h4 className="col_oran fw-bold text-uppercase ls-1 mb-3">Global Destinations &middot; 200+ Universities</h4>
                                <h1 className="display-4 fw-bold text-white mb-3">Your Global Education Awaits</h1>
                                <p className="lead opacity-75 mb-0 mx-auto" style={{ maxWidth: '700px' }}>Select a destination to explore detailed study opportunities and visa guidance.</p>
                                <h4 className="opacity-75 mt-4 mb-0 fw-bold">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <span className="col_oran">Our Destinations</span>
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

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
                                            <h3 className="text-white fw-bold text-uppercase ls-1 m-0" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>
                                                {country.name}
                                            </h3>
                                            <div className="mt-2 px-3 py-1 rounded-pill bg-white bg-opacity-20 text-white small fw-bold">
                                                {country.flag} Explore
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

            {/* CTA Section */}
            <section className="p_5 bg-white">
                <div className="container-xl">
                    <Reveal animation="scale-in">
                        <div className="bg_blue p-5 rounded-4 text-white text-center shadow-2xl position-relative overflow-hidden transition hover-lift">
                            <div className="position-absolute end-0 top-0 opacity-10 me-n4 mt-n4">
                                <i className="fa fa-globe" style={{ fontSize: '200px' }}></i>
                            </div>
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h2 className="display-4 fw-bold mb-3 text-white">Ready to Study Abroad?</h2>
                                <p className="lead opacity-75 mb-5 mx-auto" style={{ maxWidth: '700px', fontSize: '1.15rem' }}>
                                    With partnerships across 200+ universities globally and specialized expertise in student visas, your pathway to success starts here.
                                </p>
                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                    <Magnetic>
                                        <Link href="/consultation" className="btn bg_oran text-white px-5 py-4 rounded-pill fw-bold fs-5 shadow pulse-button border-0">
                                            Book Free Consultation <i className="fa fa-calendar ms-2"></i>
                                        </Link>
                                    </Magnetic>
                                    <Magnetic>
                                        <Link href="/contact" className="btn btn-outline-light px-5 py-4 rounded-pill fw-bold fs-5 border-2">
                                            Contact Us <i className="fa fa-phone ms-2"></i>
                                        </Link>
                                    </Magnetic>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <style jsx>{`
                .hover-scale { transition: transform 0.5s ease; }
                .hover-scale:hover { transform: scale(1.1); }
                .cursor-pointer { cursor: pointer; }
                .animation-fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .ring-oran {
                    box-shadow: 0 0 0 4px rgba(255, 119, 0, 0.3);
                }
            `}</style>
        </>
    );
}
