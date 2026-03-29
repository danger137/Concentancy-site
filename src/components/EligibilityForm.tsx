"use client";

import { useState } from 'react';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';

export default function EligibilityForm() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({
        education: '',
        percentage: '',
        englishTest: '',
        score: '',
        gap: ''
    });
    const [result, setResult] = useState<any>(null);

    const handleNext = () => setStep(s => s + 1);
    const handleReset = () => {
        setStep(1);
        setData({ education: '', percentage: '', englishTest: '', score: '', gap: '' });
        setResult(null);
    };

    const calculateResult = () => {
        const perc = parseInt(data.percentage);
        const gap = parseInt(data.gap);

        if (perc >= 70 && gap <= 2) {
            setResult({
                type: 'excellent',
                title: 'Outstanding Profile!',
                message: 'You have a very strong chance of admission and high-value scholarships in global destinations.',
                color: '#28a745',
                icon: 'fa-trophy'
            });
        } else if (perc >= 60 && gap <= 4) {
            setResult({
                type: 'good',
                title: 'Strong Profile',
                message: 'You qualify for most universities. We can help you find a great program that matches your budget and goals.',
                color: '#FF7700',
                icon: 'fa-check-circle'
            });
        } else {
            setResult({
                type: 'review',
                title: 'Let\'s Review Options',
                message: 'Your profile has some challenges, but we specialize in turning rejections into successes through strategic applications.',
                color: '#07294D',
                icon: 'fa-shield'
            });
        }
        setStep(6);
    };

    return (
        <div className="eligibility-content">
            {step === 1 && (
                <div className="text-center">
                    <h3 className="fw-bold mb-5">Highest Level of Education?</h3>
                    <div className="d-grid gap-3">
                        {['Intermediate / A-Levels', 'Bachelors (4 Years)', 'Masters', 'Other'].map(opt => (
                            <button key={opt} 
                                className={`btn option-btn p-3 rounded-4 ${data.education === opt ? 'active' : ''}`}
                                onClick={() => { setData({ ...data, education: opt }); handleNext(); }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="text-center">
                    <h3 className="fw-bold mb-4">Your Percentage / CGPA?</h3>
                    <div className="mb-4">
                        <input type="number" className="form-control assessment-input text-center" 
                            placeholder="Enter percentage (e.g. 75)"
                            onChange={(e) => setData({ ...data, percentage: e.target.value })} 
                            onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                        />
                    </div>
                    <Magnetic>
                        <button className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow-lg" onClick={handleNext}>Next Step <i className="fa fa-arrow-right ms-2"></i></button>
                    </Magnetic>
                </div>
            )}

            {step === 3 && (
                <div className="text-center">
                    <h3 className="fw-bold mb-4">Any English Proficiency Test?</h3>
                    <div className="d-grid gap-3">
                        {['IELTS', 'PTE', 'Duolingo', 'Not Yet'].map(opt => (
                            <button key={opt} 
                                className={`btn option-btn p-3 rounded-4 ${data.englishTest === opt ? 'active' : ''}`}
                                onClick={() => { setData({ ...data, englishTest: opt }); opt === 'Not Yet' ? setStep(5) : handleNext(); }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 4 && (
                <div className="text-center">
                    <h3 className="fw-bold mb-4">What is your score?</h3>
                    <div className="mb-4">
                        <input type="text" className="form-control assessment-input text-center" 
                            placeholder="Enter score (e.g. 6.5)"
                            onChange={(e) => setData({ ...data, score: e.target.value })} 
                            onKeyPress={(e) => e.key === 'Enter' && handleNext()}
                        />
                    </div>
                    <Magnetic>
                        <button className="btn btn-dark w-100 rounded-pill py-3 fw-bold shadow-lg" onClick={handleNext}>Next Step <i className="fa fa-arrow-right ms-2"></i></button>
                    </Magnetic>
                </div>
            )}

            {step === 5 && (
                <div className="text-center">
                    <h3 className="fw-bold mb-4">Total Study Gap (Years)?</h3>
                    <div className="mb-4">
                        <select className="form-select assessment-input text-center" onChange={(e) => setData({ ...data, gap: e.target.value })}>
                            <option value="0">No Gap</option>
                            <option value="1">1 Year</option>
                            <option value="2">2 Years</option>
                            <option value="3">3 Years</option>
                            <option value="5">More than 4 Years</option>
                        </select>
                    </div>
                    <Magnetic>
                        <button className="btn bg_oran text-white w-100 rounded-pill py-3 fw-bold shadow-lg border-0" onClick={calculateResult}>Check Eligibility Results</button>
                    </Magnetic>
                </div>
            )}

            {step === 6 && result && (
                <div className="text-center py-3">
                    <div className="mb-4 result-icon-animation">
                        <i className={`fa ${result.icon} display-1`} style={{ color: result.color }}></i>
                    </div>
                    <h2 className="fw-bold mb-3" style={{ color: result.color }}>{result.title}</h2>
                    <p className="fs-5 text-muted mb-5 px-md-4">{result.message}</p>
                    <div className="d-flex flex-column gap-3 max-w-sm mx-auto">
                        <Magnetic>
                            <Link href="/consultation" className="btn btn-dark rounded-pill py-3 fw-bold shadow-lg pulse-button w-100">Book Detailed Consultation</Link>
                        </Magnetic>
                        <button className="btn text-muted hover-oran transition" onClick={handleReset}>
                            <i className="fa fa-refresh me-2"></i> Start Over
                        </button>
                    </div>
                </div>
            )}

            {step < 6 && (
                <div className="mt-5 text-center">
                    <div className="progress assessment-progress">
                        <div className="progress-bar assessment-progress-bar" style={{ width: `${(step / 5) * 100}%` }}></div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-muted small fw-bold text-uppercase">Section Progress</span>
                        <span className="col_oran fw-bold">{Math.round((step / 5) * 100)}%</span>
                    </div>
                </div>
            )}
        </div>
    );
}
