"use client";

import { useState } from 'react';
import Link from 'next/link';

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
                message: 'You have a very strong chance of admission and even high-value scholarships in countries like UK, USA, and Canada.',
                color: '#2ECA7F'
            });
        } else if (perc >= 60 && gap <= 4) {
            setResult({
                type: 'good',
                title: 'Strong Profile',
                message: 'You qualify for most universities. We can help you find a great program that matches your background.',
                color: '#FF7700'
            });
        } else {
            setResult({
                type: 'review',
                title: 'Profile Needs Review',
                message: 'Your profile has some challenges (like gaps or lower percentages), but dont worry! We specialize in turning rejections into successes.',
                color: '#07294D'
            });
        }
        setStep(6);
    };

    return (
        <div className="eligibility-content">
            {step === 1 && (
                <div>
                    <h4 className="fw-bold mb-4">What is your highest level of education?</h4>
                    <div className="d-grid gap-3">
                        {['Intermediate / A-Levels', 'Bachelors (4 Years)', 'Masters', 'Other'].map(opt => (
                            <button key={opt} className={`btn border_1 text-start p-3 hover-lift ${data.education === opt ? 'bg_oran text-white' : 'bg-light'}`}
                                onClick={() => { setData({ ...data, education: opt }); handleNext(); }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h4 className="fw-bold mb-4">What was your last percentage/CGPA?</h4>
                    <label htmlFor="percentage" className="visually-hidden">Percentage</label>
                    <input type="number" id="percentage" className="form-control custom_input mb-4" placeholder="Enter percentage (e.g. 75)"
                        onChange={(e) => setData({ ...data, percentage: e.target.value })} />
                    <button className="button w-100" onClick={handleNext}>Next Step</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h4 className="fw-bold mb-4">Have you taken an English Test?</h4>
                    <div className="d-grid gap-3">
                        {['IELTS', 'PTE', 'Duolingo', 'Not Yet'].map(opt => (
                            <button key={opt} className={`btn border_1 text-start p-3 hover-lift ${data.englishTest === opt ? 'bg_oran text-white' : 'bg-light'}`}
                                onClick={() => { setData({ ...data, englishTest: opt }); opt === 'Not Yet' ? setStep(5) : handleNext(); }}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h4 className="fw-bold mb-4">What is your score?</h4>
                    <label htmlFor="score" className="visually-hidden">English Test Score</label>
                    <input type="text" id="score" className="form-control custom_input mb-4" placeholder="Enter score (e.g. 6.5)"
                        onChange={(e) => setData({ ...data, score: e.target.value })} />
                    <button className="button w-100" onClick={handleNext}>Next Step</button>
                </div>
            )}

            {step === 5 && (
                <div>
                    <h4 className="fw-bold mb-4">How many years of study gap do you have?</h4>
                    <label htmlFor="gap" className="visually-hidden">Study Gap</label>
                    <select id="gap" className="form-select custom_input mb-4" onChange={(e) => setData({ ...data, gap: e.target.value })}>
                        <option value="0">No Gap</option>
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="5">More than 4 Years</option>
                    </select>
                    <button className="button w-100" onClick={calculateResult}>Check Eligibility</button>
                </div>
            )}

            {step === 6 && result && (
                <div className="text-center">
                    <div className="mb-4">
                        <i className={`fa ${result.type === 'excellent' ? 'fa-check-circle' : 'fa-info-circle'} display-1`} style={{ color: result.color }}></i>
                    </div>
                    <h2 className="fw-bold" style={{ color: result.color }}>{result.title}</h2>
                    <p className="mt-3 fs-5">{result.message}</p>
                    <div className="mt-4 d-flex flex-column gap-3">
                        <Link href="/consultation" className="button pulse-button">Book Detailed Consultation</Link>
                        <button className="btn text-muted" onClick={handleReset}>Start Over</button>
                    </div>
                </div>
            )}

            {step < 6 && (
                <div className="mt-4 text-center">
                    <div className="progress" style={{ height: '6px' }}>
                        <div className="progress-bar bg_oran" style={{ width: `${(step / 5) * 100}%` }}></div>
                    </div>
                    <small className="text-muted mt-2 d-block">Step {step} of 5</small>
                </div>
            )}
        </div>
    );
}
