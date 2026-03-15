"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';

const Footer = ({ initialSettings }: { initialSettings?: any }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState(initialSettings || {
        email: 'Infinityconsultantsfsd@gmail.com',
        phone: '+92 326 4571906',
        location: 'Mazzanine floor, Media com plaza, Office No. 63, 64 Kohinoor Rd, Faisalabad'
    });

    useEffect(() => {
        if (initialSettings) setSettings(initialSettings);
    }, [initialSettings]);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setStatus({ type: 'success', message: data.message });
                setEmail('');
            } else {
                setStatus({ type: 'error', message: data.error });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main clearfix position-relative">
            <div className="main_1 clearfix position-relative w-100">
                <section id="subs">
                    <div className="container-xl">
                        <div className="row subs_1 g-4">
                            <div className="col-md-4">
                                <Reveal animation="fade-up" delay={0.1}>
                                    <div className="subs_1i p-4 shadow_box bg-white rounded-3 subs_1i1">
                                        <Magnetic><span className="radius_10 d-inline-block col_green text-center span_1 me-3"><i className="fa fa-phone"></i></span></Magnetic>
                                        <h4 className="lh-base mb-0"> {settings.phone} <br /> <span className="fs-6 span_2 text-muted">Free Support Line</span></h4>
                                    </div>
                                </Reveal>
                            </div>
                            <div className="col-md-4">
                                <Reveal animation="fade-up" delay={0.2}>
                                    <div className="subs_1i p-4 shadow_box bg-white rounded-3 subs_1i2">
                                        <Magnetic><span className="radius_10 d-inline-block col_oran text-center span_1 me-3"><i className="fa fa-headphones"></i></span></Magnetic>
                                        <h4 className="lh-base mb-0"> Support Center <br /> <span className="fs-6 span_2 text-muted">365 days full support</span></h4>
                                    </div>
                                </Reveal>
                            </div>
                            <div className="col-md-4">
                                <Reveal animation="fade-up" delay={0.3}>
                                    <div className="subs_1i p-4 shadow_box bg-white rounded-3 subs_1i3">
                                        <Magnetic><span className="radius_10 d-inline-block col_blue text-center span_1 me-3"><i className="fa fa-tv"></i></span></Magnetic>
                                        <h4 className="lh-base mb-0"> Live Support <br /> <span className="fs-6 span_2 text-muted">Write Online Now</span></h4>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div className="main_2 clearfix">
                <section id="footer" className="footer_bg">
                    <div className="footer_m p_3">
                        <div className="container-xl">
                            <div className="row footer_1">
                                <div className="col-md-3">
                                    <Reveal animation="fade-up" delay={0.1}>
                                        <div className="footer_1i">
                                            <h4 className="text-white">Quick Links</h4>
                                            <hr className="line mb-4" />
                                            <div className="row footer_1ism">
                                                <h6 className="col-md-12 col-12"><Link className="text-light" href="/about"> About Us</Link></h6>
                                                <h6 className="mt-2 col-md-12 col-12"><Link className="text-light" href="/services/study-abroad"> Our Services</Link></h6>
                                                <h6 className="mt-2 col-md-12 col-12"><Link className="text-light" href="/blog"> Blog</Link></h6>
                                                <h6 className="mt-2 col-md-12 col-12"><Link className="text-light" href="/event"> Events</Link></h6>
                                                <h6 className="mt-2 col-md-12 col-12"><Link className="text-light" href="/consultation"> Contact</Link></h6>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>
                                <div className="col-md-3">
                                    <Reveal animation="fade-up" delay={0.2}>
                                        <div className="footer_1i">
                                            <h4 className="text-white">Our Company</h4>
                                            <hr className="line mb-4" />
                                            <div className="row footer_1ism">
                                                <h6 className="col-md-12 col-12"><Link className="text-light" href="/why-choose-us"> Why Choose Us</Link></h6>
                                                <h6 className="mt-2 col-md-12 col-12"><Link className="text-light" href="/testimonials"> Testimonials</Link></h6>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>
                                <div className="col-md-3">
                                    <Reveal animation="fade-up" delay={0.3}>
                                        <div className="footer_1i">
                                            <h4 className="text-white">Support</h4>
                                            <hr className="line mb-4" />
                                            <div className="row footer_1ism">
                                                <h6 className="col-md-12 col-12"><Link className="text-light" href="/consultation"> Free Consultation</Link></h6>
                                                <h6 className="mt-2 col-md-12 col-12"><Link className="text-light" href="/consultation"> Get in Touch</Link></h6>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>
                                <div className="col-md-3">
                                    <Reveal animation="fade-up" delay={0.4}>
                                        <div className="footer_1i">
                                            <h4 className="text-white text-uppercase fw-bold mb-3">Contact Us</h4>
                                            <div className="mb-4" style={{ height: '4px', width: '50px', backgroundColor: '#f39c12' }}></div>

                                            <div className="d-flex align-items-start mb-3">
                                                <span className="me-3 fs-5" style={{ color: '#00c292' }}><i className="fa fa-map-marker"></i></span>
                                                <span className="text-light">{settings.location}</span>
                                            </div>

                                            <div className="d-flex align-items-center mb-3">
                                                <span className="me-3 fs-5" style={{ color: '#00c292' }}><i className="fa fa-phone"></i></span>
                                                <span className="text-light">{settings.phone}</span>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <span className="me-3 fs-5" style={{ color: '#00c292' }}><i className="fa fa-envelope"></i></span>
                                                <span className="text-light text-break">{settings.email}</span>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>
                            </div>
                            <div className="row footer_newsletter py-4 py-lg-5 align-items-center mx-0" style={{ borderTop: '1px solid #224e7c', borderBottom: '1px solid #224e7c', marginTop: '40px' }}>
                                <div className="col-lg-3 mb-4 mb-lg-0">
                                    <h3 className="text-white fw-bold mb-1" style={{ fontSize: '26px' }}>Subscribe Newsletter</h3>
                                    <p className="mb-0" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Get the latest updates & offers</p>
                                </div>
                                <div className="col-lg-7 mb-4 mb-lg-0">
                                    <form onSubmit={handleSubscribe} className="position-relative">
                                        <div className="d-flex rounded-pill overflow-hidden" style={{ border: '1px solid #224e7c', background: 'rgba(7, 41, 77, 0.9)' }}>
                                            <input
                                                type="email"
                                                className="form-control bg-transparent text-white border-0 shadow-none ps-4"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                style={{ flex: 1, height: '52px', fontSize: '15px' }}
                                            />
                                            <button
                                                className="btn fw-bold text-uppercase border-0 d-flex align-items-center justify-content-center px-4 flex-shrink-0"
                                                type="submit"
                                                disabled={loading}
                                                style={{
                                                    backgroundColor: '#FF7700',
                                                    color: '#fff',
                                                    borderRadius: '0 50px 50px 0',
                                                    fontSize: '12px',
                                                    letterSpacing: '0.5px',
                                                    transition: 'background 0.3s',
                                                    minWidth: '120px'
                                                }}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e86b00')}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF7700')}
                                            >
                                                {loading ? '...' : 'SUBSCRIBE'}
                                            </button>
                                        </div>
                                        {status && (
                                            <p className={`mt-2 small position-absolute start-0 w-100 ps-3 ${status.type === 'success' ? 'text-success' : 'text-danger'}`} style={{ fontWeight: 600 }}>
                                                <i className={`fa ${status.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-1`}></i>
                                                {status.message}
                                            </p>
                                        )}
                                    </form>
                                </div>
                                <div className="col-lg-2 text-end d-none d-lg-block">
                                    <div className="d-flex align-items-center justify-content-end">
                                        <span style={{ fontSize: '40px', color: '#2ECA7F', lineHeight: 1 }}><i className="fa fa-globe"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row footer_3 mt-3 pt-3">
                                <div className="col-md-9">
                                    <div className="footer_3l pt-2">
                                        <p className="mb-0 text-light">© 2025 Infinity Overseas Consultant. All Rights Reserved</p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="footer_3r text-end">
                                        <ul className="social-network social-circle mb-0">
                                            <li className="mx-1"><Magnetic><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icoFacebook" title="Facebook"><i className="fa fa-facebook"></i></a></Magnetic></li>
                                            <li className="mx-1"><Magnetic><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="icoYoutube" title="Youtube"><i className="fa fa-youtube-play"></i></a></Magnetic></li>
                                            <li className="mx-1"><Magnetic><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icoInstagram" title="Instagram"><i className="fa fa-instagram"></i></a></Magnetic></li>
                                            <li className="mx-1"><Magnetic><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="icoTiktok" title="Tiktok"><i className="fa fa-music"></i></a></Magnetic></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Footer;
