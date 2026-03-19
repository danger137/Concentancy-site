'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface SuccessStory {
    id: string;
    name: string;
    image: string;
    flag?: string | null;
    country?: string | null;
    visaType?: string | null;
    degree?: string | null;
}

interface TestimonialGridProps {
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
    'UNITED ARAB EMIRATES': { flag: '/img/1.png', bgColor: 'linear-gradient(135deg, #00732F 0%, #005524 100%)', accentColor: '#00732F' },
    CANADA: { flag: '/img/study_canada.png', bgColor: 'linear-gradient(135deg, #FF0000 0%, #cc0000 100%)', accentColor: '#FF0000' },
    USA: { flag: '/img/study_usa.png', bgColor: 'linear-gradient(135deg, #3C3B6E 0%, #2a2950 100%)', accentColor: '#3C3B6E' },
    AUSTRALIA: { flag: '/img/study_australia.png', bgColor: 'linear-gradient(135deg, #00008B 0%, #000066 100%)', accentColor: '#00008B' },
    NETHERLANDS: { flag: '/img/22.png', bgColor: 'linear-gradient(135deg, #AE1C28 0%, #8a161f 100%)', accentColor: '#AE1C28' },
    PORTUGAL: { flag: '/img/16.jpg', bgColor: 'linear-gradient(135deg, #006600 0%, #004d00 100%)', accentColor: '#006600' },
    POLAND: { flag: '/img/15.jpg', bgColor: 'linear-gradient(135deg, #DC143C 0%, #b31030 100%)', accentColor: '#DC143C' },
    CHINA: { flag: '/img/8.png', bgColor: 'linear-gradient(135deg, #DE2910 0%, #b2210d 100%)', accentColor: '#DE2910' },
    MALAYSIA: { flag: '/img/3.png', bgColor: 'linear-gradient(135deg, #010066 0%, #000044 100%)', accentColor: '#010066' },
    THAILAND: { flag: 'https://flagcdn.com/w160/th.png', bgColor: 'linear-gradient(135deg, #A51931 0%, #2D2A4A 100%)', accentColor: '#A51931' },
    LATVIA: { flag: 'https://flagcdn.com/w320/lv.png', bgColor: 'linear-gradient(135deg, #9E1B34 0%, #7d1529 100%)', accentColor: '#9E1B34' },
};

const defaultConfig: CountryConfig = {
    flag: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/un.svg',
    bgColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    accentColor: '#1a1a2e',
};

function getCountryConfig(country: string): CountryConfig {
    const key = (country || "").toUpperCase().trim();
    return countryConfigs[key] || defaultConfig;
}

// ── INTERNAL MODAL COMPONENT ──
interface SuccessStoryModalProps {
    country: string;
    stories: SuccessStory[];
    onClose: () => void;
}

const SuccessStoryModal: React.FC<SuccessStoryModalProps> = ({ country, stories, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const direction = useRef(0);

    useEffect(() => {
        document.body.classList.add('story-modal-open');
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.classList.remove('story-modal-open');
            document.body.style.overflow = 'auto';
        };
    }, []);

    const nextSlide = () => {
        direction.current = 1;
        setCurrentIndex((prev) => (prev + 1) % stories.length);
    };

    const prevSlide = () => {
        direction.current = -1;
        setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    };

    const currentStory = stories[currentIndex];
    const config = getCountryConfig(country);
    const visaType = currentStory.visaType || "Study Visa";
    const degree = currentStory.degree || "Academic Program";
    const name = currentStory.name || "Student Name";

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
    };

    return (
        <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center story-modal-overlay"
            style={{ zIndex: 10001, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(15px)' }}
        >
            {/* STICKY HEADER FOR MOBILE */}
            <div className="mobile-only-header d-md-none position-fixed top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center z-3 bg-black bg-opacity-80 border-bottom border-white border-opacity-10" style={{ backdropFilter: 'blur(10px)' }}>
                <div className="d-flex align-items-center gap-2">
                    <img src={currentStory.flag || config.flag} alt="flag" width={30} height={20} className="rounded-1" />
                    <span className="text-white fw-black text-uppercase x-small ls-1">{country} Success</span>
                </div>
                <button onClick={onClose} className="btn btn-danger btn-sm rounded-pill px-3 fw-bold x-small">CLOSE</button>
            </div>

            <div className="position-fixed close-btn-container" style={{ zIndex: 10000 }}>
                <button 
                    onClick={onClose} 
                    className="btn btn-danger d-flex align-items-center gap-2 px-3 py-2 rounded-pill shadow-2xl border border-2 border-white hover-up transition close-btn"
                >
                    <i className="fa fa-times"></i>
                    <span>CLOSE</span>
                </button>
            </div>

            <div className="container-xl position-relative modal-main-container">
                <div className="slider-viewport position-relative">
                    <AnimatePresence initial={false} custom={direction.current} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction.current}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ x: { type: "spring", stiffness: 200, damping: 25 }, opacity: { duration: 0.2 } }}
                            className="w-100 h-100"
                        >
                            <div className="premium-success-card shadow-2xl rounded-5 overflow-hidden d-flex flex-column flex-md-row bg-white border h-100 position-relative">
                                {/* Left Column: Country */}
                                <div 
                                    className="col-md-5 position-relative d-flex align-items-center justify-content-center overflow-hidden border-end border-white border-opacity-10 country-section"
                                    style={{ background: config.bgColor }}
                                >
                                    <div className="position-absolute w-100 h-100 opacity-50" style={{ 
                                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/map.png")',
                                        backgroundSize: '400px', filter: 'invert(1)'
                                    }}></div>

                                    <div className="position-absolute top-0 end-0 m-4 z-2 flag-badge d-none d-md-block">
                                        <img 
                                            src={currentStory.flag || config.flag} alt={`${country} Flag`} 
                                            width={70} height={45} className="rounded shadow-sm"
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

                                    <div className="position-relative z-2 text-center p-4">
                                        <h1 className="text-white fw-black mb-0 text-uppercase drop-shadow-lg country-bg-text"
                                            style={{ 
                                                fontFamily: 'var(--font-heading)',
                                                letterSpacing: '-2px', textShadow: '0 15px 40px rgba(0,0,0,0.5)', lineHeight: 0.9
                                            }}
                                        >
                                            {country}
                                        </h1>
                                        {stories.length > 1 && (
                                            <div className="badge bg-white text-dark mt-3 fs-6 px-3 py-2 rounded-pill shadow-lg story-counter">
                                                Story {currentIndex + 1} of {stories.length}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column: Student Details */}
                                <div className="col-md-7 position-relative dark-info-section overflow-hidden info-section">
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
                                                <img src={currentStory.image || config.flag || "/img/hero_main.png"} alt="Visa" className="w-100 h-100 object-fit-cover" />
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

                                {/* Navigation Arrows - Only show if >1 story */}
                                {stories.length > 1 && (
                                    <>
                                        <button onClick={prevSlide} className="nav-arrow-btn position-absolute start-0 top-50 translate-middle ms-3 z-3 shadow-lg"><i className="fa fa-chevron-left"></i></button>
                                        <button onClick={nextSlide} className="nav-arrow-btn position-absolute end-0 top-50 translate-middle me-3 z-3 shadow-lg"><i className="fa fa-chevron-right"></i></button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <style jsx>{`
                .dark-info-section { background: #000; }
                .ls-1 { letter-spacing: 1px; }
                .x-small { font-size: 0.65rem; }
                .xx-small { font-size: 0.5rem; }
                .fw-black { font-weight: 900; }
                .nav-arrow-btn {
                    background: rgba(0, 0, 0, 0.6); border: 2px solid rgba(255,255,255,0.3); width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.4rem; transition: all 0.3s; cursor: pointer; backdrop-filter: blur(10px); outline: none;
                }
                .nav-arrow-btn:hover { background: var(--col_oran); transform: scale(1.1); border-color: transparent; }
                .shadow-2xl { box-shadow: 0 50px 100px -20px rgba(0,0,0,0.8); }

                .close-btn-container { top: 40px; right: 40px; }
                .close-btn { font-size: 1.1rem; font-weight: bold; outline: none; }
                .slider-viewport { height: 80vh; min-height: 550px; maxHeight: 700px; }
                .country-bg-text { font-size: 5.5rem; }
                .congrats-text { font-size: 2.8rem; }
                .student-name-text { font-size: 3rem; }
                .visa-sticker-wrapper { position: absolute; end: 0; top: 50%; transform: translateY(-50%); margin-right: 1.5rem; display: block; }
                .visa-sticker { width: 280px; height: 170px; border: 5px solid #111; }
                .uni-badge { min-width: 220px; }
                .country-name-small { font-size: 1.75rem; }
                .logo-box { width: 110px; }

                @media (max-width: 767px) {
                    .close-btn-container { display: none; }
                    .modal-main-container { padding: 0; margin-top: 55px; height: calc(100vh - 55px); overflow-y: auto; width: 100%; max-width: 100%; border-radius: 0; }
                    .slider-viewport { height: auto; min-height: 100%; max-height: none; padding-bottom: 0; }
                    .premium-success-card { height: auto !important; border-radius: 0 !important; border: none !important; }
                    .country-bg-text { font-size: 3.5rem !important; }
                    .country-section { height: 200px; padding: 20px !important; border-bottom: 2px solid rgba(255,255,255,0.1); }
                    .info-section { min-height: 100vh; }
                    .detail-content { padding: 20px !important; padding-bottom: 80px !important; }
                    .visa-badge { min-width: 120px !important; padding: 8px !important; border-radius: 12px !important; }
                    .country-name-small { font-size: 1.1rem !important; }
                    .congrats-text { font-size: 1.8rem !important; }
                    .student-name-text { font-size: 1.8rem !important; }
                    .degree-text { font-size: 0.9rem !important; }
                    .visa-sticker-wrapper { position: relative; margin: 30px 0; top: 0; transform: none; display: flex; justify-content: center; width: 100%; }
                    .visa-sticker { width: 100%; max-width: 300px; height: 180px; }
                    .logo-box { width: 80px !important; padding: 5px !important; }
                    .mobile-hide { display: none; }
                    .mobile-stack { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; }
                    .nav-arrow-btn { width: 45px; height: 45px; font-size: 1.1rem; }
                    .story-counter { margin-top: 15px !important; font-size: 0.8rem !important; }
                }

                @media (max-width: 380px) {
                    .country-bg-text { font-size: 2.5rem !important; }
                    .congrats-text { font-size: 1.6rem !important; }
                    .student-name-text { font-size: 1.6rem !important; }
                    .visa-sticker { max-width: 240px; height: 140px; }
                    .visa-badge { min-width: 100px !important; }
                    .country-name-small { font-size: 1rem !important; }
                }
            `}</style>
        </div>
    );
}

import { fallbackSuccessStories } from '@/data/fallbackStories';

// ── MAIN EXPORT: GRID COMPONENT ──
const TestimonialGrid: React.FC<TestimonialGridProps> = ({ stories }) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    // Use fallback data if stories are empty
    const displayStories = (stories && stories.length > 0) ? stories : fallbackSuccessStories;

    if (!displayStories || displayStories.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">No success stories found.</p>
            </div>
        );
    }

    // Group stories by country
    const storiesByCountry: Record<string, SuccessStory[]> = {};
    displayStories.forEach(story => {
        let rawCountry = story.country || "GLOBAL";
        // Normalize "UNITED KINGDOM" and "UK"
        let countryKey = rawCountry.toUpperCase().trim();
        if (countryKey === "UNITED KINGDOM") countryKey = "UK";
        if (countryKey === "UNITED ARAB EMIRATES" || countryKey === "DUBAI") countryKey = "UAE";

        if (!storiesByCountry[countryKey]) {
            storiesByCountry[countryKey] = [];
        }
        storiesByCountry[countryKey].push(story as SuccessStory);
    });

    const uniqueCountries = Object.keys(storiesByCountry).sort();

    return (
        <div className="testimonial-grid-section pt-4 pb-5">
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />

            <div className="row g-4 justify-content-center">
                <AnimatePresence>
                    {uniqueCountries.map((country, index) => {
                        const config = getCountryConfig(country);
                        const count = storiesByCountry[country].length;

                        return (
                            <motion.div 
                                className="col-12 col-md-6 col-lg-4 col-xl-3" 
                                key={country}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div 
                                    className="country-grid-card h-100 rounded-4 p-4 text-center cursor-pointer shadow-sm position-relative overflow-hidden d-flex flex-column align-items-center justify-content-center"
                                    style={{ background: config.bgColor, minHeight: '220px', transition: 'all 0.3s ease-out', cursor: 'pointer' }}
                                    onClick={() => setSelectedCountry(country)}
                                >
                                    <div className="position-absolute w-100 h-100 top-0 start-0 opacity-20 pattern-bg" style={{ 
                                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/map.png")',
                                        backgroundSize: '300px', filter: 'invert(1)'
                                    }}></div>
                                    
                                    <div className="flag-container shadow-lg rounded mb-3 position-relative z-1 overflow-hidden d-flex align-items-center justify-content-center bg-white bg-opacity-10" style={{ border: '2px solid rgba(255,255,255,0.2)', width: '80px', height: '50px' }}>
                                        <img 
                                            src={storiesByCountry[country][0]?.flag || config.flag} width={80} height={50} alt={country} 
                                            className="w-100 h-100 object-fit-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/un.svg';
                                            }}
                                        />
                                    </div>
                                    
                                    <h3 className="text-white fw-bold mb-3 position-relative z-1 ls-1" style={{ fontSize: country.length > 10 ? '1.2rem' : '1.5rem', fontFamily: 'var(--font-heading)' }}>{country}</h3>
                                    
                                    <div className="mt-auto position-relative z-1 w-100">
                                        <div className="d-flex align-items-center justify-content-center gap-2">
                                            <span className="btn btn-warning px-4 py-2 rounded-pill fw-bold shadow-sm d-flex align-items-center gap-2 hvr-grow">
                                                Explore <i className="fa fa-arrow-right small"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {selectedCountry && (
                    <SuccessStoryModal 
                        country={selectedCountry}
                        stories={storiesByCountry[selectedCountry]}
                        onClose={() => setSelectedCountry(null)}
                    />
                )}
            </AnimatePresence>

            <style jsx>{`
                .country-grid-card {
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transform: translateY(0);
                }
                .country-grid-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2) !important;
                }
                .country-grid-card:hover .flag-container {
                    transform: scale(1.1);
                    transition: transform 0.3s ease;
                }
                .flag-container {
                    transition: transform 0.3s ease;
                }
                .ls-1 { letter-spacing: 1px; }
            `}</style>
        </div>
    );
};

export default TestimonialGrid;
