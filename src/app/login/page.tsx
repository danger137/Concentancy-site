'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Screen = 'login' | 'forgot' | 'otp' | 'reset';

export default function LoginPage() {
    const [screen, setScreen] = useState<Screen>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setError('');
        try {
            const res = await fetch('/api/admin/auth?action=login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
            const data = await res.json();
            if (res.ok) { router.push('/admin/newsletter'); } else { setError(data.error || 'Login failed'); }
        } catch { setError('Something went wrong.'); } finally { setLoading(false); }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault(); setLoading(true); setError(''); setSuccess('');
        try {
            const res = await fetch('/api/admin/auth?action=forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
            const data = await res.json();
            if (res.ok) { setSuccess('OTP sent to your email!'); setScreen('otp'); setOtp(['', '', '', '', '', '']); } else { setError(data.error || 'Failed to send OTP'); }
        } catch { setError('Something went wrong.'); } finally { setLoading(false); }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length < 6) { setError('Please enter all 6 digits'); return; }
        setLoading(true); setError('');
        try {
            const res = await fetch('/api/admin/auth?action=verify-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp: otpValue }) });
            const data = await res.json();
            if (res.ok) { setScreen('reset'); setSuccess(''); } else { setError(data.error || 'Invalid OTP'); }
        } catch { setError('Something went wrong.'); } finally { setLoading(false); }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) value = value.slice(-1); // Only take last char
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move to next box
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault(); setError('');
        if (newPassword !== confirmPassword) { setError('Passwords do not match'); return; }
        if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
        setLoading(true);
        try {
            const res = await fetch('/api/admin/auth?action=reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, otp: otp.join(''), newPassword }) });
            const data = await res.json();
            if (res.ok) { setSuccess('Password reset successfully!'); setScreen('login'); setPassword(''); setOtp(['', '', '', '', '', '']); setNewPassword(''); setConfirmPassword(''); }
            else { setError(data.error || 'Failed'); }
        } catch { setError('Something went wrong.'); } finally { setLoading(false); }
    };

    const screenInfo: Record<Screen, { title: string; subtitle: string; icon: string }> = {
        login: { title: 'Admin Login', subtitle: 'Sign in to access the dashboard', icon: 'fa-user-shield' },
        forgot: { title: 'Forgot Password', subtitle: 'Enter your admin email to receive a code', icon: 'fa-envelope-o' },
        otp: { title: 'Verify OTP', subtitle: 'Enter the 6-digit code sent to your email', icon: 'fa-key' },
        reset: { title: 'New Password', subtitle: 'Create a new password for your account', icon: 'fa-lock' },
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0a1929', fontFamily: "'Inter', 'Rubik', sans-serif", padding: '20px', position: 'relative', overflow: 'hidden'
        }}>
            {/* Background grid pattern */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* Glow orbs */}
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,119,0,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-150px', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(46,202,127,0.1) 0%, transparent 70%)', borderRadius: '50%' }}></div>

            <div style={{
                maxWidth: '440px', width: '100%', position: 'relative', zIndex: 1
            }}>
                {/* Logo + Header */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <Link href="/">
                        <img src="/Infinity-Logo-new.webp" alt="Infinity Overseas" style={{ height: '50px', marginBottom: '16px', filter: 'drop-shadow(0 4px 12px rgba(255,119,0,0.3))' }} />
                    </Link>
                </div>

                {/* Main Card */}
                <div style={{
                    background: 'linear-gradient(145deg, #111d2e 0%, #0d1b2a 100%)',
                    borderRadius: '20px', padding: '40px 36px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset'
                }}>
                    {/* Screen icon + title */}
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, #FF7700 0%, #ff9a3c 100%)',
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            marginBottom: '16px', boxShadow: '0 8px 24px rgba(255,119,0,0.3)'
                        }}>
                            <i className={`fa ${screenInfo[screen].icon}`} style={{ color: '#fff', fontSize: '22px' }}></i>
                        </div>
                        <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.3px' }}>
                            {screenInfo[screen].title}
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', margin: 0 }}>
                            {screenInfo[screen].subtitle}
                        </p>
                    </div>

                    {/* Success */}
                    {success && (
                        <div style={{
                            padding: '12px 16px', background: 'rgba(46,202,127,0.1)', border: '1px solid rgba(46,202,127,0.2)',
                            borderRadius: '10px', marginBottom: '20px', color: '#2ECA7F', fontSize: '13px',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <i className="fa fa-check-circle"></i> {success}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div style={{
                            padding: '12px 16px', background: 'rgba(255,77,79,0.1)', border: '1px solid rgba(255,77,79,0.2)',
                            borderRadius: '10px', marginBottom: '20px', color: '#ff6b6b', fontSize: '13px',
                            display: 'flex', alignItems: 'center', gap: '8px'
                        }}>
                            <i className="fa fa-exclamation-circle"></i> {error}
                        </div>
                    )}

                    {/* ═══ LOGIN ═══ */}
                    {screen === 'login' && (
                        <form onSubmit={handleLogin}>
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa fa-envelope" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}></i>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" required
                                        style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s' }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = '#FF7700'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,119,0,0.1)'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Password</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa fa-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}></i>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                                        style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s' }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = '#FF7700'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,119,0,0.1)'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} style={{
                                width: '100%', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: 'linear-gradient(135deg, #FF7700 0%, #ff9a3c 100%)', color: '#fff',
                                fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 8px 24px rgba(255,119,0,0.3)', transition: 'all 0.2s', letterSpacing: '0.3px'
                            }}>
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <>Sign In <i className="fa fa-arrow-right"></i></>}
                            </button>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button type="button" onClick={() => { setScreen('forgot'); setError(''); setSuccess(''); }}
                                    style={{ background: 'none', border: 'none', color: '#FF7700', fontSize: '13px', fontWeight: '500', cursor: 'pointer', opacity: 0.8 }}>
                                    <i className="fa fa-lock me-1"></i> Forgot Password?
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ═══ FORGOT ═══ */}
                    {screen === 'forgot' && (
                        <form onSubmit={handleForgot}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Admin Email</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa fa-envelope" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}></i>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your admin email" required
                                        style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s' }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = '#FF7700'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,119,0,0.1)'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} style={{
                                width: '100%', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: 'linear-gradient(135deg, #FF7700 0%, #ff9a3c 100%)', color: '#fff',
                                fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 8px 24px rgba(255,119,0,0.3)', transition: 'all 0.2s'
                            }}>
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <>Send OTP <i className="fa fa-paper-plane"></i></>}
                            </button>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button type="button" onClick={() => { setScreen('login'); setError(''); setSuccess(''); }}
                                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer' }}>
                                    <i className="fa fa-angle-left me-1"></i> Back to Login
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ═══ OTP ═══ */}
                    {screen === 'otp' && (
                        <form onSubmit={handleVerifyOtp}>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Verification Code</label>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                                    {[0, 1, 2, 3, 4, 5].map((idx) => (
                                        <input
                                            key={idx}
                                            ref={(el) => { otpRefs.current[idx] = el; }}
                                            type="text"
                                            value={otp[idx]}
                                            onChange={(e) => handleOtpChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(idx, e)}
                                            maxLength={1}
                                            required
                                            style={{
                                                width: '100%', height: '54px', borderRadius: '10px',
                                                border: '1px solid rgba(255,119,0,0.2)',
                                                background: 'rgba(255,255,255,0.04)', color: '#FF7700',
                                                fontSize: '22px', fontWeight: '700', textAlign: 'center',
                                                outline: 'none', transition: 'all 0.2s'
                                            }}
                                            onFocus={(e) => { e.currentTarget.style.borderColor = '#FF7700'; e.currentTarget.style.background = 'rgba(255,119,0,0.08)'; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,119,0,0.2)'; e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <button type="submit" disabled={loading} style={{
                                width: '100%', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: 'linear-gradient(135deg, #FF7700 0%, #ff9a3c 100%)', color: '#fff',
                                fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 8px 24px rgba(255,119,0,0.3)', transition: 'all 0.2s'
                            }}>
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <>Verify OTP <i className="fa fa-check"></i></>}
                            </button>
                            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                                <button type="button" onClick={() => { handleForgot({ preventDefault: () => { } } as any); }}
                                    style={{ background: 'none', border: 'none', color: '#FF7700', fontSize: '13px', cursor: 'pointer', opacity: 0.8 }}>
                                    <i className="fa fa-refresh me-1"></i> Resend OTP
                                </button>
                            </div>
                        </form>
                    )}

                    {/* ═══ RESET ═══ */}
                    {screen === 'reset' && (
                        <form onSubmit={handleReset}>
                            <div style={{ marginBottom: '18px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>New Password</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa fa-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}></i>
                                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                                        style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s' }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = '#FF7700'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,119,0,0.1)'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Confirm Password</label>
                                <div style={{ position: 'relative' }}>
                                    <i className="fa fa-lock" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}></i>
                                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required minLength={6}
                                        style={{ width: '100%', padding: '13px 14px 13px 40px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: '14px', outline: 'none', transition: 'all 0.2s' }}
                                        onFocus={(e) => { e.currentTarget.style.borderColor = '#FF7700'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,119,0,0.1)'; }}
                                        onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={loading} style={{
                                width: '100%', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                                background: 'linear-gradient(135deg, #FF7700 0%, #ff9a3c 100%)', color: '#fff',
                                fontSize: '15px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                boxShadow: '0 8px 24px rgba(255,119,0,0.3)', transition: 'all 0.2s'
                            }}>
                                {loading ? <i className="fa fa-spinner fa-spin"></i> : <>Save Password <i className="fa fa-save"></i></>}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer link */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <Link href="/" style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none', fontSize: '13px' }}>
                        <i className="fa fa-angle-left me-1"></i> Back to Website
                    </Link>
                </div>
            </div>

            <style jsx>{`
                button[type="submit"]:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); }
                button[type="submit"]:active { transform: translateY(0); }
                input::placeholder { color: rgba(255,255,255,0.2) !important; }
            `}</style>
        </div>
    );
}
