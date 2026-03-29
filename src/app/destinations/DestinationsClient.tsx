"use client";

import StudyAbroadDestinations from '@/components/StudyAbroadDestinations';
import Link from 'next/link';
import { Reveal } from '@/components/RevealAnimations';

export default function DestinationsClient() {
    return (
        <>
            {/* Hero Banner */}
            <section id="center" className="center_o p_3 bg_blue" style={{ background: 'linear-gradient(135deg, rgba(7,41,77,0.92), rgba(30,80,130,0.88)), url("/img/3.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 text-white py-4 d-flex flex-column mb-4">
                            <Reveal animation="fade-down">
                                <h4 className="col_oran fw-bold text-uppercase ls-1 mb-3">Global Destinations &middot; 200+ Universities</h4>
                                <h1 className="display-4 fw-bold text-white mb-3">Your Global Education Awaits</h1>
                                <p className="lead text-white mb-0" style={{ maxWidth: '700px' }}>Select a destination to explore detailed study opportunities and visa guidance.</p>
                                <h4 className="opacity-75 mt-4 mb-0 fw-bold">
                                    <Link className="text-white text-decoration-none" href="/">Home</Link> <span className="mx-2">/</span> <span className="col_oran">Our Destinations</span>
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <StudyAbroadDestinations />
        </>
    );
}
