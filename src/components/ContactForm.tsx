'use client';

import React, { useState } from 'react';
import Magnetic from '@/components/Magnetic';

interface ContactFormProps {
    settings: {
        phone: string;
    };
}

const ContactForm: React.FC<ContactFormProps> = ({ settings }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setResponseMsg(data.message);
                setForm({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setResponseMsg(data.error || 'Something went wrong.');
            }
        } catch {
            setStatus('error');
            setResponseMsg('Network error. Please try again.');
        }
    };

    return (
        <div className="p-4 p-md-5 bg-white h-100">
            <div className="mb-4 text-center">
                <h3 className="fw-bold h2 uppercase text-danger" style={{ color: '#e41b23 !important' }}>SEND US A MESSAGE</h3>
            </div>

            {status === 'success' ? (
                <div className="text-center py-5">
                    <div className="mb-4">
                        <span className="d-inline-flex align-items-center justify-content-center bg-success text-white rounded-circle" style={{ width: '80px', height: '80px' }}>
                            <i className="fa fa-check fa-3x"></i>
                        </span>
                    </div>
                    <h4 className="fw-bold text-success">Message Sent!</h4>
                    <p className="text-muted">{responseMsg}</p>
                    <button className="btn bg_blue text-white mt-3 px-4 py-2 rounded-pill shadow-sm" onClick={() => setStatus('idle')}>Send Another Message</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-uppercase text-muted mb-1">Full Name *</label>
                            <input name="name" type="text" className="form-control p-3 bg-light border-0 shadow-none rounded-3" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-uppercase text-muted mb-1">Phone Number *</label>
                            <input name="phone" type="tel" className="form-control p-3 bg-light border-0 shadow-none rounded-3" placeholder="+92 300 1234567" value={form.phone} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-uppercase text-muted mb-1">Email Address *</label>
                            <input name="email" type="email" className="form-control p-3 bg-light border-0 shadow-none rounded-3" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-uppercase text-muted mb-1">Subject</label>
                            <input name="subject" type="text" className="form-control p-3 bg-light border-0 shadow-none rounded-3" placeholder="Inquiry about Study Visa" value={form.subject} onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-uppercase text-muted mb-1">Your Message *</label>
                            <textarea name="message" className="form-control p-3 bg-light border-0 shadow-none rounded-3" rows={4} placeholder="How can we help you?" value={form.message} onChange={handleChange} required></textarea>
                        </div>
                        {status === 'error' && (
                            <div className="col-12">
                                <div className="alert alert-danger py-2 border-0 rounded-3 small">{responseMsg}</div>
                            </div>
                        )}
                        <div className="col-12 mt-2">
                            <Magnetic>
                                <button type="submit" className="button w-100 py-3 fs-5 border-0 shadow hvr-grow rounded-pill" disabled={status === 'loading'} style={{ backgroundColor: '#FF7700', color: '#fff' }}>
                                    {status === 'loading' ? (
                                        <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Sending...</>
                                    ) : (
                                        <>Send Message <i className="fa fa-paper-plane ms-2"></i></>
                                    )}
                                </button>
                            </Magnetic>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ContactForm;
