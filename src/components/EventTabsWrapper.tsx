"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';

export default function EventTabsWrapper({ initialDay, initialEvents }: { initialDay: string, initialEvents: any[] }) {
    const [activeTab, setActiveTab] = useState(initialDay);
    const [events, setEvents] = useState<any[]>(initialEvents);
    const [loading, setLoading] = useState(false);

    const eventDays = [
        { id: 'day1', label: 'DAY 1', date: '15 March, 2025' },
        { id: 'day2', label: 'DAY 2', date: '20 March, 2025' },
        { id: 'day3', label: 'DAY 3', date: '25 March, 2025' },
        { id: 'day4', label: 'DAY 4', date: '30 March, 2025' }
    ];

    useEffect(() => {
        if (activeTab !== initialDay) {
            fetchEvents();
        }
    }, [activeTab]);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/events?dayId=${activeTab}`);
            const data = await res.json();
            if (res.ok && Array.isArray(data)) setEvents(data);
        } catch (e) {
            console.error('Error fetching events:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="event_1 row w-100 justify-content-center">
                <div className="col-md-10 text-center">
                    <Reveal animation="fade-up">
                        <ul className="nav nav-tabs mb-0 text-center justify-content-center border-0 d-inline-flex">
                            {eventDays.map((day) => (
                                <li key={day.id} className="nav-item d-inline-block me-2 lh-1">
                                    <Magnetic>
                                        <button
                                            onClick={() => setActiveTab(day.id)}
                                            className={`nav-link border-0 ${activeTab === day.id ? 'active' : ''}`}
                                        >
                                            {day.label} <br /> <span className="fs-6 fw-normal">{day.date}</span>
                                        </button>
                                    </Magnetic>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </div>
            <div className="event_2 row mt-4">
                <div className="tab-content radius_10 p-4">
                    <div className="tab-pane active" style={{ minHeight: 400 }}>
                        {loading ? (
                            <div className="text-center p-5">
                                <i className="fa fa-spinner fa-spin fa-3x text-white opacity-50"></i>
                                <p className="mt-3 text-white opacity-50">Loading events...</p>
                            </div>
                        ) : events.length === 0 ? (
                            <div className="text-center p-5">
                                <i className="fa fa-calendar-o fa-3x text-white opacity-20"></i>
                                <p className="mt-3 text-white opacity-50">No events found for this day.</p>
                            </div>
                        ) : events.map((event, index) => (
                            <Reveal key={event.id || index} animation="fade-up" delay={index * 0.1}>
                                <div
                                    className={`home_i row ${event.color || 'bg-light'} pt-4 pb-4 px-2 mx-0 radius_10 mt-4 shadow-sm hover-lift transition`}
                                >
                                    <div className="col-md-3">
                                        <div className="home_il">
                                            <div className="grid clearfix">
                                                <figure className="effect-jazz mb-0">
                                                    <a href="#">
                                                        <img src={event.image || '/assets/images/placeholder.jpg'} loading="lazy" width={400} height={250} style={{ objectFit: 'cover' }} className="w-100 rounded-3 shadow-sm" alt={event.title} />
                                                    </a>
                                                </figure>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="home_ir">
                                            <h4 className={`fw-bold ${event.textWhite ? 'text-white' : ''}`}>{event.title}</h4>
                                            <p className={event.textWhite ? 'text-light' : ''}>
                                                {event.description}
                                            </p>
                                            <h6 className={`fw-bold mt-3 ${event.textWhite ? 'text-light' : 'text-muted'}`}>
                                                <i className="fa fa-clock-o me-2"></i>{event.time} <span className="mx-2">|</span> <i className="fa fa-map-marker me-2"></i>{event.location}
                                            </h6>
                                            <div className="mt-4">
                                                <Magnetic>
                                                    <Link
                                                        className={`button pulse-button ${event.textWhite ? 'bg-white text-black border-white' : 'button_1'}`}
                                                        href="/consultation"
                                                    >
                                                        Get Tickets <i className="fa fa-chevron-right ms-1"></i>
                                                    </Link>
                                                </Magnetic>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
