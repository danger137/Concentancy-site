"use client";

import React, { useState } from 'react';

export default function ConsultationFormWrapper({ settings }: { settings: any }) {
    const [form, setForm] = useState({
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
        lastQualification: '',
        preferredCountry: '',
        fieldOfInterest: '',
        languageTest: '',
        modeOfCounselling: '',
        modeOfFunding: '',
        termsAccepted: false,
        contactConsent: false
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [responseMsg, setResponseMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.termsAccepted) {
            setStatus('error');
            setResponseMsg('Please accept the terms and conditions.');
            return;
        }
        setStatus('loading');

        try {
            const res = await fetch('/api/consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setStatus('success');
                setResponseMsg(data.message);
                setForm({ 
                    firstName: '', lastName: '', email: '', phone: '', 
                    lastQualification: '', preferredCountry: '', fieldOfInterest: '', 
                    languageTest: '', modeOfCounselling: '', modeOfFunding: '',
                    termsAccepted: false, contactConsent: false
                });
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
                <h3 className="fw-bold h2 uppercase text-danger" style={{ color: '#e41b23 !important' }}>GET FREE CONSULTATION</h3>
            </div>

            {status === 'success' ? (
                <div className="text-center py-5">
                    <div className="mb-4 d-inline-block p-4 rounded-circle bg-success text-white shadow-lg pulse-animation">
                        <i className="fa fa-check fa-4x text-white"></i>
                    </div>
                    <h4 className="fw-bold h2 mb-3">Request Received!</h4>
                    <p className="text-muted lead mb-4">{responseMsg}</p>
                    <button className="btn bg_blue text-white px-5 py-3 rounded-pill fw-bold shadow-lg" onClick={() => setStatus('idle')}>Submit Another Request</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">First Name *</label>
                            <input name="firstName" type="text" className="form-control p-3 bg_white border-secondary rounded-3 shadow-none" placeholder="" value={form.firstName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Last Name *</label>
                            <input name="lastName" type="text" className="form-control p-3 bg_white border-secondary rounded-3 shadow-none" placeholder="" value={form.lastName} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Email *</label>
                            <input name="email" type="email" className="form-control p-3 bg_white border-secondary rounded-3 shadow-none" placeholder="" value={form.email} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Mobile Number *</label>
                            <input name="phone" type="tel" className="form-control p-3 bg_white border-secondary rounded-3 shadow-none" placeholder="" value={form.phone} onChange={handleChange} required />
                        </div>
                        
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Select Last Qualification *</label>
                            <select name="lastQualification" className="form-select p-3 bg_white border-secondary rounded-3 shadow-none text-muted" value={form.lastQualification} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Matric / O-Levels">Matric / O-Levels</option>
                                <option value="Intermediate / A-Levels">Intermediate / A-Levels</option>
                                <option value="Bachelor's Degree">Bachelor's Degree</option>
                                <option value="Master's Degree">Master's Degree</option>
                                <option value="PhD / Other">PhD / Other</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Select Prefered Country *</label>
                            <select name="preferredCountry" className="form-select p-3 bg_white border-secondary rounded-3 shadow-none text-muted" value={form.preferredCountry} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="UK">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="USA">USA</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="Italy">Italy</option>
                                <option value="Scandinavia">Scandinavia</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Select Field of Interest</label>
                            <select name="fieldOfInterest" className="form-select p-3 bg_white border-secondary rounded-3 shadow-none text-muted" value={form.fieldOfInterest} onChange={handleChange}>
                                <option value="">Select</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Business & Management">Business & Management</option>
                                <option value="Computer Science / IT">Computer Science / IT</option>
                                <option value="Health & Medical">Health & Medical</option>
                                <option value="Arts & Humanities">Arts & Humanities</option>
                                <option value="Visit / Tourism">Visit / Tourism</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Language Test *</label>
                            <select name="languageTest" className="form-select p-3 bg_white border-secondary rounded-3 shadow-none text-muted" value={form.languageTest} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="IELTS">IELTS</option>
                                <option value="PTE">PTE</option>
                                <option value="Duolingo">Duolingo</option>
                                <option value="No Test Attempted">No Test Attempted</option>
                                <option value="Waiver Required">Waiver Required</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Mode of Counselling *</label>
                            <select name="modeOfCounselling" className="form-select p-3 bg_white border-secondary rounded-3 shadow-none text-muted" value={form.modeOfCounselling} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="In Person (Faisalabad Office)">In Person (Faisalabad Office)</option>
                                <option value="Virtual (Zoom / WhatsApp)">Virtual (Zoom / WhatsApp)</option>
                                <option value="Phone Call">Phone Call</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold small text-muted mb-1">Mode of Funding *</label>
                            <select name="modeOfFunding" className="form-select p-3 bg_white border-secondary rounded-3 shadow-none text-muted" value={form.modeOfFunding} onChange={handleChange} required>
                                <option value="">Select</option>
                                <option value="Self Funded">Self Funded</option>
                                <option value="Sponsorship">Sponsorship</option>
                                <option value="Bank Loan">Bank Loan</option>
                                <option value="Scholarship Required">Scholarship Required</option>
                            </select>
                        </div>

                        <div className="col-12 mt-3">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" name="termsAccepted" id="termsAccepted" checked={form.termsAccepted} onChange={handleChange} required />
                                <label className="form-check-label small text-muted" htmlFor="termsAccepted">
                                    I agree to Infinity Overseas Terms and privacy policy
                                </label>
                            </div>
                            <div className="form-check mb-4">
                                <input className="form-check-input" type="checkbox" name="contactConsent" id="contactConsent" checked={form.contactConsent} onChange={handleChange} />
                                <label className="form-check-label small text-muted" htmlFor="contactConsent">
                                    Please contact me by phone, email or SMS to assist with my enquiry
                                </label>
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="col-12">
                                <div className="alert alert-danger py-2 rounded-3 mb-3 d-flex align-items-center small">
                                    <i className="fa fa-exclamation-circle me-3"></i> {responseMsg}
                                </div>
                            </div>
                        )}

                        <div className="col-12 mt-0">
                            <button type="submit" className="btn bg_oran text-white w-100 py-3 fs-5 rounded-pill fw-bold shadow-lg hvr-grow border-0" disabled={status === 'loading'} style={{ backgroundColor: '#FF7700' }}>
                                {status === 'loading' ? (
                                    <><span className="spinner-border spinner-border-sm me-2" role="status"></span>Processing...</>
                                ) : (
                                    <>Book Free Appointment <i className="fa fa-calendar-check-o ms-2"></i></>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
