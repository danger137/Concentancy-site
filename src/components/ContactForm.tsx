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
        <div className="p-4 p-md-5 bg-white h-100 position-relative overflow-hidden">
            <div className="mb-5 text-center position-relative" style={{ zIndex: 1 }}>
                <span className="d-block col_green fw-bold text-uppercase ls-2 mb-2">Get In Touch</span>
                <h2 className="fw-bold display-6 mb-0 text-gradient-oran uppercase">SEND US A MESSAGE</h2>
                <div className="line bg_oran mx-auto mt-3" style={{ width: '60px', height: '4px' }}></div>
            </div>

            {status === 'success' ? (
                <div className="text-center py-5 position-relative" style={{ zIndex: 1 }}>
                    <div className="mb-4">
                        <span className="d-inline-flex align-items-center justify-content-center bg_green text-white rounded-circle shadow-lg" style={{ width: '80px', height: '80px' }}>
                            <i className="fa fa-check fa-3x text-white"></i>
                        </span>
                    </div>
                    <h4 className="fw-bold col_blue">Message Sent Successfully!</h4>
                    <p className="text-muted fs-5">{responseMsg}</p>
                    <button className="button bg_blue border-0 mt-3 px-5 py-3 rounded-pill shadow hover-lift" onClick={() => setStatus('idle')}>Send Another Message</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="position-relative" style={{ zIndex: 1 }}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-uppercase col_blue mb-2 ls-1">Full Name *</label>
                            <input name="name" type="text" className="form-control custom_input p-3 rounded-3" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-uppercase col_blue mb-2 ls-1">Phone Number *</label>
                            <input name="phone" type="tel" className="form-control custom_input p-3 rounded-3" placeholder="+92 300 1234567" value={form.phone} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-uppercase col_blue mb-2 ls-1">Email Address *</label>
                            <input name="email" type="email" className="form-control custom_input p-3 rounded-3" placeholder="john@example.com" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-uppercase col_blue mb-2 ls-1">Subject</label>
                            <input name="subject" type="text" className="form-control custom_input p-3 rounded-3" placeholder="Inquiry about Study Visa" value={form.subject} onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <label className="form-label fw-bold small text-uppercase col_blue mb-2 ls-1">Your Message *</label>
                            <textarea name="message" className="form-control custom_input p-3 rounded-3" rows={5} placeholder="Tell us how we can help you achieve your goals..." value={form.message} onChange={handleChange} required></textarea>
                        </div>
                        {status === 'error' && (
                            <div className="col-12">
                                <div className="alert alert-danger py-3 border-0 shadow-sm rounded-3 small d-flex align-items-center">
                                    <i className="fa fa-exclamation-circle me-3 fs-5"></i>
                                    {responseMsg}
                                </div>
                            </div>
                        )}
                        <div className="col-12 mt-4 text-center">
                            <Magnetic>
                                <button type="submit" className="button w-100 py-3 fs-5 border-0 shadow-lg pulse-button rounded-pill" disabled={status === 'loading'}>
                                    {status === 'loading' ? (
                                        <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Processing...</>
                                    ) : (
                                        <>Send Your Message <i className="fa fa-paper-plane ms-2"></i></>
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
