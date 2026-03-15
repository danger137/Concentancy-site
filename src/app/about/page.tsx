import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import { unstable_cache } from 'next/cache';
import "../../styles/about.css";

export const metadata: Metadata = {
    title: "About Us | Infinity Overseas Consultants",
    description: "Learn about Infinity Overseas Consultants, mission, and the expert leadership team led by Khurram Hashmi. We are dedicated to turning your international dreams into reality.",
    keywords: ["About Infinity Overseas", "Khurram Hashmi Founder", "Immigration Consultants History", "Study Abroad Mission"],
};

export const revalidate = 3600; // Revalidate every hour

export default async function About() {

    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                            <Reveal animation="fade-down">
                                <h1 className="text-white h-100 w-100">About Infinity Overseas</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> About Us
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="story" className="p_3">
                <div className="container-xl d-flex flex-column">
                    <div className="row align-items-center">
                        {/* <div className="col-md-6">
                            <Reveal animation="scale-in">
                                <Image
                                    src="/founder.jpg"
                                    width={800}
                                    height={600}
                                    className="w-100 rounded-3 shadow hover-zoom transition"
                                    alt="Khurram Hashmi - Founder & CEO"
                                    priority
                                    style={{ height: 'auto' }}
                                />
                            </Reveal>
                        </div> */}
                        <div className="col-md-6 ps-md-5 pt-4">
                            <Reveal animation="fade-left">

                                <h2 className="display-5 fw-bold mt-2">Where Experience Meets <span className="col_oran">Excellence</span></h2>
                                <p className="mt-4 lead text-muted"> The Founder & CEO of Infinity Overseas Consultant, has led the organization with a clear vision and a passion for helping people achieve their dreams abroad. Backed by years of experience and a 100% success rate in major visa categories, he has helped thousands navigate their path to international success.</p>
                                <p className="text-muted">Driven by purpose and defined by results, we simplify your journey to studying abroad. With expert guidance, personalized support, and a deep understanding of global immigration trends, we make the transition smooth and successful.</p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="member" className="p_3 bg-light">
                <div className="container-xl">
                    <div className="row member_1">
                        {[
                            { icon: "fa-graduation-cap", color: "oran", title: "Study Visa Expert", desc: "Get expert help for student visas in UK, Europe, Canada, Australia, and USA with personalized guidance." },
                            { icon: "fa-file-text", color: "green", title: "Document Support", desc: "Ensure your SOP, visa forms, and financial documents meet the highest embassy standards." },
                            { icon: "fa-comments", color: "blue", title: "Free Counseling", desc: "Book a session to discuss your goals and get country-specific advice from our expert consultants." }
                        ].map((item, i) => (
                            <div key={i} className="col-md-4">
                                <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                                    <div className="member_1i row p-4 bg-white rounded-4 shadow-sm h-100 border hover-lift transition d-flex align-items-center">
                                        <div className="col-md-3">
                                            <div className="member_1il">
                                                <Magnetic>
                                                    <span className={`d-inline-block text-center bg_${item.color} text-white rounded-circle fs-3`} style={{ width: '60px', height: '60px', lineHeight: '60px' }}>
                                                        <i className={`fa ${item.icon}`}></i>
                                                    </span>
                                                </Magnetic>
                                            </div>
                                        </div>
                                        <div className="col-md-9">
                                            <div className="member_1ir">
                                                <h5 className="fw-bold">{item.title}</h5>
                                                <p className="mb-0 small text-muted">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
}
