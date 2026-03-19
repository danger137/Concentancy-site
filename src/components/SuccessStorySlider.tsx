'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessStory {
    id: string;
    name: string;
    image: string;
    country?: string | null;
    visaType?: string | null;
    degree?: string | null;
}

interface SuccessStorySliderProps {
    stories: SuccessStory[];
}

// ── Country-Specific Visual Config ──
interface CountryConfig {
    flag: string;
    bgColor: string;
    accentColor: string;
}

const countryConfigs: Record<string, CountryConfig> = {
    FRANCE: { flag: '/img/dest_france.png', bgColor: 'linear-gradient(135deg, #002395 0%, #001a6e 100%)', accentColor: '#002395' },
    UK: { flag: '/img/dest_uk.png', bgColor: 'linear-gradient(135deg, #00247D 0%, #001845 100%)', accentColor: '#00247D' },
    'UNITED KINGDOM': { flag: '/img/dest_uk.png', bgColor: 'linear-gradient(135deg, #00247D 0%, #001845 100%)', accentColor: '#00247D' },
    IRELAND: { flag: '/img/dest_ireland.png', bgColor: 'linear-gradient(135deg, #169B62 0%, #0e7a4a 100%)', accentColor: '#169B62' },
    GERMANY: { flag: '/img/6.png', bgColor: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #DD0000 100%)', accentColor: '#DD0000' },
    ITALY: { flag: '/img/dest_italy.png', bgColor: 'linear-gradient(135deg, #008C45 0%, #005a2e 100%)', accentColor: '#008C45' },
    SPAIN: { flag: '/img/dest_spain.png', bgColor: 'linear-gradient(135deg, #AA151B 0%, #8a1015 100%)', accentColor: '#AA151B' },
    TURKEY: { flag: '/img/dest_turkey.png', bgColor: 'linear-gradient(135deg, #E30A17 0%, #b80812 100%)', accentColor: '#E30A17' },
    SWEDEN: { flag: '/img/21.png', bgColor: 'linear-gradient(135deg, #006AA7 0%, #004d7a 100%)', accentColor: '#006AA7' },
    DENMARK: { flag: '/img/dest_uk.png', bgColor: 'linear-gradient(135deg, #C60C30 0%, #9a0926 100%)', accentColor: '#C60C30' },
    FINLAND: { flag: '/img/5.png', bgColor: 'linear-gradient(135deg, #003580 0%, #002660 100%)', accentColor: '#003580' },
    ROMANIA: { flag: '/img/19.jpg', bgColor: 'linear-gradient(135deg, #002B7F 0%, #001f5c 100%)', accentColor: '#002B7F' },
    HUNGARY: { flag: '/img/18.jpg', bgColor: 'linear-gradient(135deg, #436F4D 0%, #2e5035 100%)', accentColor: '#436F4D' },
    LITHUANIA: { flag: '/img/23.png', bgColor: 'linear-gradient(135deg, #006A44 0%, #004d31 100%)', accentColor: '#006A44' },
    CYPRUS: { flag: '/img/17.jpg', bgColor: 'linear-gradient(135deg, #D47600 0%, #a85d00 100%)', accentColor: '#D47600' },
    MALTA: { flag: '/img/20.png', bgColor: 'linear-gradient(135deg, #CF142B 0%, #a31022 100%)', accentColor: '#CF142B' },
    GEORGIA: { flag: '/img/5.png', bgColor: 'linear-gradient(135deg, #FF0000 0%, #cc0000 100%)', accentColor: '#FF0000' },
    DUBAI: { flag: '/img/1.png', bgColor: 'linear-gradient(135deg, #00732F 0%, #005524 100%)', accentColor: '#00732F' },
    UAE: { flag: '/img/1.png', bgColor: 'linear-gradient(135deg, #00732F 0%, #005524 100%)', accentColor: '#00732F' },
    CANADA: { flag: '/img/study_canada.png', bgColor: 'linear-gradient(135deg, #FF0000 0%, #cc0000 100%)', accentColor: '#FF0000' },
    USA: { flag: '/img/study_usa.png', bgColor: 'linear-gradient(135deg, #3C3B6E 0%, #2a2950 100%)', accentColor: '#3C3B6E' },
    AUSTRALIA: { flag: '/img/study_australia.png', bgColor: 'linear-gradient(135deg, #00008B 0%, #000066 100%)', accentColor: '#00008B' },
    NETHERLANDS: { flag: '/img/22.png', bgColor: 'linear-gradient(135deg, #AE1C28 0%, #8a161f 100%)', accentColor: '#AE1Corange' },
    PORTUGAL: { flag: '/img/16.jpg', bgColor: 'linear-gradient(135deg, #006600 0%, #004d00 100%)', accentColor: '#006600' },
    POLAND: { flag: '/img/15.jpg', bgColor: 'linear-gradient(135deg, #DC143C 0%, #b31030 100%)', accentColor: '#DC143C' },
    CHINA: { flag: '/img/8.png', bgColor: 'linear-gradient(135deg, #DE2910 0%, #b2210d 100%)', accentColor: '#DE2910' },
    MALAYSIA: { flag: '/img/3.png', bgColor: 'linear-gradient(135deg, #010066 0%, #000044 100%)', accentColor: '#010066' },
};

const defaultConfig: CountryConfig = {
    flag: '/img/dest_uk.png',
    bgColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    accentColor: '#1a1a2e',
};

function getCountryConfig(country: string): CountryConfig {
    const key = (country || "").toUpperCase().trim();
    return countryConfigs[key] || defaultConfig;
}

// ── TWO-COLUMN SLIDER INSIDE TAB ──
interface InlineCountrySliderProps {
    country: string;
    stories: SuccessStory[];
}

const InlineCountrySlider: React.FC<InlineCountrySliderProps> = ({ country, stories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const config = getCountryConfig(country);

    // Reset index when country changes
    useEffect(() => {
        setCurrentIndex(0);
        setDirection(0);
    }, [country]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % stories.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    };

    const slideVariants = {
        enter: (direction: number) => ({ x: direction > 0 ? 300 : -300, opacity: 0, scale: 0.98 }),
        center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 300 : -300, opacity: 0, scale: 0.98 })
    };

    if (!stories || stories.length === 0) return null;

    const currentStory = stories[currentIndex];
    const visaType = currentStory.visaType || "Study Visa";
    const degree = currentStory.degree || "Academic Program";
    const name = currentStory.name || "Student Name";

    return (
        <div className="slider-viewport position-relative w-100 mobile-success-viewport" style={{ minHeight: '500px' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentIndex + country}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    className="w-100 h-100"
                >
                    <div className="premium-success-card shadow-2xl rounded-5 overflow-hidden d-flex flex-column flex-md-row bg-white border h-100 position-relative">
                        {/* Left Column: Country */}
                        <div 
                            className="col-md-5 position-relative d-flex align-items-center justify-content-center overflow-hidden border-end border-white border-opacity-10"
                            style={{ background: config.bgColor }}
                        >
                            <div className="position-absolute w-100 h-100 opacity-50" style={{ 
                                backgroundImage: 'url("https://www.transparenttextures.com/patterns/map.png")',
                                backgroundSize: '400px', filter: 'invert(1)'
                            }}></div>

                            <div className="position-absolute top-0 end-0 m-4 z-2">
                                <img 
                                    src={config.flag} alt={`${country} Flag`} 
                                    width={70} height={45} className="rounded shadow-sm"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/un.svg';
                                    }}
                                />
                            </div>

                            <div className="position-absolute w-100 h-100">
                                <Image 
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                    alt="World Map" fill 
                                    className="object-fit-cover opacity-50 mix-blend-multiply scale-110"
                                    unoptimized
                                />
                            </div>

                            <div className="position-relative z-2 text-center p-4 py-5 py-md-4">
                                <h1 className="text-white fw-black mb-0 text-uppercase drop-shadow-lg country-title-responsive"
                                    style={{ 
                                        fontFamily: 'var(--font-heading)',
                                        textShadow: '0 15px 40px rgba(0,0,0,0.5)', lineHeight: 0.9
                                    }}
                                >
                                    {country}
                                </h1>
                                {stories.length > 1 && (
                                    <div className="badge bg-white text-dark mt-3 fs-6 px-3 py-2 rounded-pill shadow-lg position-relative story-counter-badge">
                                        Story {currentIndex + 1} of {stories.length}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Student Details */}
                        <div className="col-md-7 position-relative dark-info-section overflow-hidden">
                            <div className="position-absolute w-100 h-100 top-0 start-0">
                                <Image src="/img/hero_main.png" alt="Landmark" fill className="object-fit-cover opacity-60" />
                                <div className="position-absolute w-100 h-100" style={{ background: 'linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.4))' }}></div>
                            </div>

                            <div className="position-relative z-1 h-100 p-4 p-md-5 d-flex flex-column detail-content">
                                <div className="d-flex justify-content-between align-items-start mb-2 header-badges">
                                    <div className="logo-box bg-white p-2 px-3 rounded shadow-lg">
                                       <div className="bg-danger text-white fw-black px-1 py-1 rounded-1 x-small mb-1 text-center">TOP 7</div>
                                       <div className="text-black fw-bold xx-small ls-1 text-center">CONSULTANTS</div>
                                    </div>

                                    <div className="uni-badge bg-warning rounded-4 p-3 px-4 text-center shadow-lg visa-badge">
                                        <div className="fw-black text-dark country-name-small" style={{ lineHeight: 1 }}>{country}</div>
                                        <div className="xx-small text-dark opacity-75 mt-1 fw-bold visa-type-small" style={{ lineHeight: 1.2 }}>{visaType}</div>
                                    </div>
                                </div>

                                <div className="flex-grow-1 d-flex flex-column justify-content-center mt-4 main-text-group">
                                    <h1 className="text-white display-4 fw-black mb-1 text-capitalize mobile-hide">{country}</h1>
                                    <h2 className="text-white display-6 fw-bold mb-3 mobile-hide">{visaType}</h2>
                                    
                                    <div className="congrats-wrapper position-relative ps-4 mt-4">
                                        <div className="position-absolute start-0 top-0 h-100 bg-warning line-decorator" style={{ width: '8px', borderRadius: '4px' }}></div>
                                        <h3 className="text-white opacity-90 mb-1 congrats-text" style={{ fontFamily: "'Dancing Script', cursive" }}>Congratulations</h3>
                                        <h1 className="display-4 fw-bold text-white mb-2 student-name-text" style={{ lineHeight: '1.1' }}>{name}</h1>
                                        <p className="text-white opacity-90 fs-5 mb-0 fw-medium degree-text">{degree}</p>
                                    </div>
                                </div>

                                <div className="visa-sticker-wrapper z-3">
                                    <div className="visa-sticker shadow-2xl rounded-2 overflow-hidden position-relative">
                                        <img src={currentStory.image || config.flag || "/img/hero_main.png"} alt="Visa" width={280} height={170} loading="lazy" className="w-100 h-100 object-fit-cover" />
                                        <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-white bg-opacity-95 d-flex justify-content-between">
                                            <span className="fw-black xx-small text-dark mt-1">OFFICIAL VISA GRANTED</span>
                                            <i className="fa fa-check-circle text-success fs-5"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="footer-links d-flex gap-3 justify-content-start align-items-center mt-auto pt-4 border-top border-white border-opacity-10 mobile-stack">
                                    <div className="d-flex align-items-center gap-2 px-3 py-2 bg-warning rounded-pill shadow-lg">
                                        <div className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                            <i className="fa fa-whatsapp text-dark small"></i>
                                        </div>
                                        <span className="text-dark fw-black small text-nowrap">0312 6522076</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2 px-3 py-2 bg-warning rounded-pill shadow-lg">
                                        <div className="bg-white rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>
                                            <i className="fa fa-globe text-dark small"></i>
                                        </div>
                                        <span className="text-dark fw-black small text-nowrap">Top7Consultant.com</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        {stories.length > 1 && (
                            <>
                                <button onClick={prevSlide} className="nav-arrow-btn position-absolute start-0 top-50 translate-middle ms-3 z-3 shadow-lg" style={{ background: 'rgba(0,0,0,0.6)' }}><i className="fa fa-chevron-left"></i></button>
                                <button onClick={nextSlide} className="nav-arrow-btn position-absolute end-0 top-50 translate-middle me-3 z-3 shadow-lg" style={{ background: 'rgba(0,0,0,0.6)' }}><i className="fa fa-chevron-right"></i></button>
                            </>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
            <style jsx>{`
                .dark-info-section { background: #000; }
                .ls-1 { letter-spacing: 1px; }
                .x-small { font-size: 0.65rem; }
                .xx-small { font-size: 0.5rem; }
                .fw-black { font-weight: 900; }
                .nav-arrow-btn {
                    background: rgba(0, 0, 0, 0.4); border: 2px solid rgba(255,255,255,0.3); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.4rem; transition: all 0.3s; cursor: pointer; backdrop-filter: blur(10px); outline: none;
                }
                .nav-arrow-btn:hover { background: var(--col_oran); transform: scale(1.1); border-color: transparent; }
                .shadow-2xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8); }
                .country-title-responsive { font-size: 5.5rem; letter-spacing: -2px; }
                .slider-viewport { height: 85vh; min-height: 650px; max-height: 900px; }
                .mobile-success-viewport { height: 85vh; min-height: 650px; max-height: 900px; }
                .congrats-text { font-size: 2.8rem; }
                .student-name-text { font-size: 3rem; }
                .visa-sticker-wrapper { position: absolute; right: 0; top: 55%; transform: translateY(-50%); margin-right: 2rem; display: block; }
                .visa-sticker { width: 280px; height: 170px; border: 5px solid #111; }
                .uni-badge { min-width: 220px; }
                .country-name-small { font-size: 1.75rem; }
                .logo-box { width: 110px; }

                @media (max-width: 768px) {
                    .mobile-success-viewport { height: auto; min-height: 900px; max-height: none; }
                    .country-title-responsive { font-size: 3.5rem !important; letter-spacing: -1px; }
                    .story-counter-badge { transform: none !important; margin-top: 1rem !important; }
                    .slider-viewport { height: auto !important; max-height: none !important; }
                    .premium-success-card { height: auto !important; }
                    .dark-info-section { padding-bottom: 3rem !important; }
                    .detail-content { padding: 20px !important; padding-bottom: 80px !important; }
                    .visa-badge { min-width: 120px !important; padding: 8px !important; border-radius: 12px !important; }
                    .country-name-small { font-size: 1.1rem !important; }
                    .congrats-text { font-size: 1.8rem !important; }
                    .student-name-text { font-size: 1.8rem !important; }
                    .degree-text { font-size: 0.9rem !important; }
                    .visa-sticker-wrapper { position: relative; right: auto; top: auto; transform: none; display: flex; justify-content: center; margin: 30px 0; width: 100%; display: block !important; }
                    .visa-sticker { width: 100%; max-width: 300px; height: 180px; }
                    .logo-box { width: 80px !important; padding: 5px !important; }
                    .mobile-hide { display: none; }
                    .mobile-stack { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
                }
                @media (max-width: 480px) {
                    .mobile-success-viewport { min-height: 1000px; }
                    .country-title-responsive { font-size: 2.5rem !important; }
                    .congrats-wrapper h3 { font-size: 1.6rem !important; }
                    .congrats-wrapper h1 { font-size: 1.6rem !important; }
                    .visa-sticker { max-width: 240px; height: 140px; }
                    .visa-badge { min-width: 100px !important; }
                    .country-name-small { font-size: 1rem !important; }
                }
            `}</style>
        </div>
    );
};

import { fallbackSuccessStories } from '@/data/fallbackStories';

// ── MAIN EXPORT: TABS COMPONENT ──
const SuccessStorySlider: React.FC<SuccessStorySliderProps> = ({ stories }) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    // Use fallback data if stories are empty
    const displayStories = (stories && stories.length > 0) ? stories : fallbackSuccessStories;

    // Group stories by country
    const storiesByCountry: Record<string, SuccessStory[]> = {};
    if (displayStories) {
        displayStories.forEach(story => {
            const countryKey = (story.country || "GLOBAL").toUpperCase().trim();
            if (!storiesByCountry[countryKey]) {
                storiesByCountry[countryKey] = [];
            }
            storiesByCountry[countryKey].push(story as SuccessStory);
        });
    }

    const uniqueCountries = Object.keys(storiesByCountry).sort();

    // Set first country as default selected
    useEffect(() => {
        if (!selectedCountry && uniqueCountries.length > 0) {
            setSelectedCountry(uniqueCountries[0]);
        }
    }, [uniqueCountries, selectedCountry]);

    if (!displayStories || displayStories.length === 0) {
        return <div className="text-center py-5"><p className="text-muted">No success stories found.</p></div>;
    }

    return (
        <div className="success-story-tabs-section pt-3 pb-5">
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />

            <div className="container-xl">
                {/* ── TABS NAVIGATION ── */}
                <div className="country-tabs-wrapper mb-5 overflow-hidden">
                    <div className="d-flex flex-nowrap overflow-auto hide-scrollbar pb-3 pt-2 gap-3 px-2 justify-content-md-center justify-content-start" style={{ scrollBehavior: 'smooth' }}>
                        {uniqueCountries.map((country) => {
                            const config = getCountryConfig(country);
                            const isActive = selectedCountry === country;
                            const count = storiesByCountry[country].length;

                            return (
                                <button
                                    key={country}
                                    onClick={() => setSelectedCountry(country)}
                                    className={`country-tab-btn rounded-pill d-flex align-items-center gap-2 px-4 py-2 flex-shrink-0 border-0 shadow-sm transition-all ${isActive ? 'active-tab' : 'inactive-tab'}`}
                                    style={{
                                        background: isActive ? config.accentColor : '#fff',
                                        color: isActive ? '#fff' : '#333',
                                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                        border: isActive ? '2px solid transparent' : '2px solid #eef0f2'
                                    }}
                                >
                                    <div className="rounded overflow-hidden shadow-sm d-flex align-items-center justify-content-center bg-white bg-opacity-10" style={{ width: '28px', height: '20px' }}>
                                        <img 
                                            src={config.flag} width={28} height={20} alt={country} 
                                            style={{ objectFit: 'cover' }} 
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/un.svg';
                                            }}
                                        />
                                    </div>
                                    <span className="fw-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', letterSpacing: '0.5px' }}>{country}</span>
                                    <span className={`badge rounded-pill ms-1 ${isActive ? 'bg-white text-dark' : 'bg-light text-muted border'}`} style={{ fontSize: '0.7rem' }}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── ACTIVE TAB CONTENT ── */}
                <div className="tab-content-wrapper position-relative">
                    {selectedCountry && (
                        <InlineCountrySlider 
                            country={selectedCountry} 
                            stories={storiesByCountry[selectedCountry]} 
                        />
                    )}
                </div>
            </div>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .country-tab-btn {
                    outline: none;
                    cursor: pointer;
                }
                .inactive-tab:hover {
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05) !important;
                    transform: translateY(-2px);
                }
                .active-tab {
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15) !important;
                    position: relative;
                }
                .active-tab::after {
                    content: '';
                    position: absolute;
                    bottom: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    border-width: 8px;
                    border-style: solid;
                    border-color: inherit transparent transparent transparent;
                }
            `}</style>
        </div>
    );
};

export default SuccessStorySlider;
