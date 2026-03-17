import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import TeamHierarchyWrapper from '@/components/TeamHierarchyWrapper';

import "../../styles/about.css";

export const metadata: Metadata = {
    title: "About Us | Infinity Overseas Consultants",
    description: "Learn about Infinity Overseas Consultants, mission, and the expert leadership team led by Khurram Hashmi. We are dedicated to turning your international dreams into reality.",
    keywords: ["About Infinity Overseas", "Khurram Hashmi Founder", "Immigration Consultants History", "Study Abroad Mission"],
};

export const revalidate = 3600;

export default async function About() {

    return (
        <>
            {/* Hero Banner */}
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

            {/* Our Story Section */}
            <section id="story" className="p_3">
                <div className="container-xl d-flex flex-column">
                    <div className="row align-items-center g-5">
                        <div className="col-md-6 pe-md-5 pt-4 text-center text-md-start">
                            <Reveal animation="fade-right">
                                <h4 className="col_oran uppercase fw-bold mb-3 ls-1">OUR FOUNDER'S VISION</h4>
                                <h2 className="display-4 fw-bold mt-2 lh-sm mb-4">Where Experience <br />Meets <span className="col_oran">Excellence</span></h2>
                                <p className="mt-4 lead text-muted" style={{ lineHeight: '1.8' }}> The Founder & CEO of Infinity Overseas Consultant, has led the organization with a clear vision and a passion for helping people achieve their dreams abroad. Backed by years of experience and a 100% success rate in major visa categories, he has helped thousands navigate their path to international success.</p>
                                <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>Driven by purpose and defined by results, we simplify your journey to studying abroad. With expert guidance, personalized support, and a deep understanding of global immigration trends, we make the transition smooth and successful.</p>
                            </Reveal>
                        </div>
                        <div className="col-md-6 mt-5 mt-md-0">
                            <Reveal animation="scale-in" delay={0.2}>
                                <div className="position-relative">
                                    <Image 
                                        src="/img/about_experience.png" 
                                        alt="Global Education Experience" 
                                        width={600} 
                                        height={500} 
                                        className="img-fluid rounded-4 shadow-2xl hover-zoom transition w-100"
                                        style={{ height: '500px', objectFit: 'cover' }}
                                    />
                                    <div className="position-absolute bottom-0 start-0 m-4 bg-white p-3 rounded-4 shadow-lg d-none d-lg-block">
                                        <div className="d-flex align-items-center">
                                            <i className="fa fa-graduation-cap fs-2 col_oran me-3"></i>
                                            <div>
                                                <h5 className="mb-0 fw-bold">100%</h5>
                                                <small className="text-muted fw-bold">Success Rate</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Cards */}
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

            {/* Team Hierarchy Section */}
            <TeamHierarchyWrapper />

        </>
    );
}
