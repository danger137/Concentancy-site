"use client";

import { useState } from 'react';

export default function FaqAccordion({ faqs = [] }: { faqs?: { q: string, a: React.ReactNode }[] }) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="accordion mt-3">
            {faqs.map((faq, i) => (
                <div key={i} className="mb-3">
                    <button
                        className="d-flex w-100 border-0 justify-content-between align-items-center p-3 px-4 rounded-3 text-start"
                        onClick={() => toggleFaq(i)}
                        style={{ backgroundColor: '#f4f5f8', transition: 'all 0.3s ease' }}
                        aria-expanded={activeFaq === i}
                        aria-controls={`faq-content-${i}`}
                    >
                        <h6 className="mb-0 fw-bold" style={{ color: '#111', fontSize: '1.05rem' }}>
                            {faq.q}
                        </h6>
                        <div
                            className="d-flex align-items-center justify-content-center flex-shrink-0 ms-3"
                            style={{
                                width: '32px', height: '32px',
                                borderRadius: '50%',
                                border: `1px solid ${activeFaq === i ? '#c82333' : '#a3a3a3'}`,
                                color: activeFaq === i ? '#c82333' : '#a3a3a3',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <i className={`fa fa-${activeFaq === i ? 'minus' : 'plus'}`} style={{ fontSize: '13px' }} aria-hidden="true"></i>
                        </div>
                    </button>
                    {activeFaq === i && (
                        <div id={`faq-content-${i}`} className="pt-3 px-4 pb-2 bg-white" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                            <div className="text-muted mb-0" style={{ lineHeight: '1.7', fontSize: '15px' }}>{faq.a}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
