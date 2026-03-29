"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

interface Video {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    country: string | null;
}

const DEFAULT_VIDEOS: Video[] = [];

export default function VideoSection({ videos = DEFAULT_VIDEOS }: { videos?: Video[] }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
    const data = videos.length > 0 ? videos : DEFAULT_VIDEOS;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    };

    const getPosition = (index: number) => {
        const diff = (index - currentIndex + data.length) % data.length;
        if (diff === 0) return 'center';
        if (diff === 1 || diff === -(data.length - 1)) return 'right';
        if (diff === data.length - 1 || diff === -1) return 'left';
        return 'hidden';
    };

    return (
        <section id="latest-videos" className="py-5 bg-white overflow-hidden">
            <div className="container-xl">
                <div className="row mb-5">
                    <div className="col-12">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="display-4 fw-bold mb-0 col_oran"
                        >
                            Our Upcoming Events/Testimonials
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lead text-dark fw-bold mt-2"
                        >
                            To Stay updated on studying abroad!
                        </motion.p>
                    </div>
                </div>

                <div className="position-relative" style={{ height: '400px' }}>
                    <div className="d-flex align-items-center justify-content-center h-100 position-relative" style={{ perspective: '1000px' }}>
                        {data.map((video, index) => {
                            const pos = getPosition(index);
                            const isActive = pos === 'center';
                            const isLeft = pos === 'left';
                            const isRight = pos === 'right';

                            if (pos === 'hidden') return null;

                            return (
                                <motion.div
                                    key={video.id}
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : isLeft ? -300 : 300,
                                        scale: isActive ? 1.1 : 0.8,
                                        rotateY: isActive ? 0 : isLeft ? 35 : -35,
                                        zIndex: isActive ? 10 : 5,
                                        opacity: isActive ? 1 : 0.6,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="position-absolute"
                                    style={{ width: '450px', cursor: 'pointer' }}
                                    onClick={() => {
                                        if (isActive) setSelectedVideoUrl(video.url);
                                        else setCurrentIndex(index);
                                    }}
                                >
                                    <div className="video-card rounded-5 overflow-hidden shadow-lg border border-4 position-relative" style={{ aspectRatio: '16/10', borderColor: 'var(--col_oran, #f57c00)' }}>
                                        <img 
                                            src={video.thumbnail} 
                                            alt={video.country || ""}
                                            width={450} height={280}
                                            loading="lazy"
                                            className="w-100 h-100 object-fit-cover"
                                            style={{ position: 'absolute', top: 0, left: 0 }}
                                        />
                                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-10 d-flex align-items-center justify-content-center">
                                            <div className="play-button bg-white bg-opacity-70 rounded-circle d-flex align-items-center justify-content-center shadow-lg" style={{ width: '80px', height: '80px', border: '2px solid white' }}>
                                                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FF7700" style={{ marginLeft: '4px' }}>
                                                    <polygon points="5,3 19,12 5,21" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="position-absolute top-50 start-0 translate-middle-y z-3 ms-4">
                        <Magnetic>
                            <button onClick={prevSlide} className="btn bg-dark bg-opacity-50 text-white rounded-circle p-3 shadow-lg border-0 nav-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                            </button>
                        </Magnetic>
                    </div>
                    <div className="position-absolute top-50 end-0 translate-middle-y z-3 me-4">
                        <Magnetic>
                            <button onClick={nextSlide} className="btn bg-dark bg-opacity-50 text-white rounded-circle p-3 shadow-lg border-0 nav-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                            </button>
                        </Magnetic>
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    {data.map((_, i) => (
                        <div 
                            key={i}
                            className={`rounded-circle transition-all ${i === currentIndex ? 'bg-oran px-3' : 'bg-secondary bg-opacity-25'}`}
                            style={{ width: i === currentIndex ? 'auto' : '10px', height: '10px', backgroundColor: i === currentIndex ? '#FF7700' : undefined }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Video Modal Overlay */}
            <AnimatePresence>
                {selectedVideoUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-90"
                        style={{ 
                            zIndex: 99999, 
                            backdropFilter: 'blur(25px)', 
                            margin: 0, 
                            padding: 0, 
                            display: 'grid', 
                            placeItems: 'center' 
                        }}
                        onClick={() => setSelectedVideoUrl(null)}
                    >
                        {/* Extreme Corner Close Button */}
                        <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setSelectedVideoUrl(null); }}
                            className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center"
                            style={{ 
                                position: 'fixed',
                                top: '25px', 
                                right: '25px', 
                                width: '55px', 
                                height: '55px', 
                                zIndex: 100000,
                                cursor: 'pointer',
                                background: '#FF7700',
                                border: '2px solid white',
                                color: 'white',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 119, 0, 0.6)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="w-100 px-3"
                            style={{ maxWidth: '1000px' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-100 rounded-5 overflow-hidden shadow-2xl border border-white border-opacity-20 bg-black position-relative" style={{ aspectRatio: '16/9', boxShadow: '0 0 60px rgba(255, 119, 0, 0.4)' }}>
                                <video
                                    src={selectedVideoUrl}
                                    controls
                                    autoPlay
                                    className="w-100 h-100 object-fit-contain"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .video-card {
                    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .play-button {
                    transition: transform 0.3s ease;
                }
                .video-card:hover .play-button {
                    transform: scale(1.1);
                }
                .nav-btn:hover {
                    background-color: #FF7700 !important;
                    opacity: 1 !important;
                }
            `}</style>
        </section>
    );
}
