import Link from 'next/link';
import Image from 'next/image';
import StatCounter from '@/components/StatCounter';
import FlyingPlaneWrapper from '@/components/FlyingPlaneWrapper';
import EligibilityForm from '@/components/EligibilityForm';
import RevealAnimations, { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import StudyAbroadAnimation from '@/components/StudyAbroadAnimation';
import SuccessStorySlider from '@/components/SuccessStorySlider';

import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import { Metadata } from 'next';
import "../styles/index.css";

export const metadata: Metadata = {
    title: "Infinity Overseas Consultants | Top Study Abroad & Immigration Experts",
    description: "Expert study abroad and immigration consultancy in Faisalabad. Specialized in student visas for UK, USA, Canada, and Europe.",
    alternates: { canonical: 'https://infinityconsultants.pk' },
};

export const revalidate = 10; // Cache homepage for 10 seconds (faster updates)

// Cache DB queries — avoids hitting database on every request
const getCachedHomeData = unstable_cache(
  async () => {
    try {
      const [services, successStories] = await Promise.all([
        prisma.service.findMany({ orderBy: { createdAt: 'asc' }, take: 6 }),
        prisma.successStory.findMany({ 
          orderBy: { createdAt: 'desc' }, 
          take: 10,
          select: {
            id: true,
            name: true,
            feedback: true,
            image: true,
            country: true,
            visaType: true,
            degree: true,
            date: true
          }
        })
      ]);
      return { services, successStories };
    } catch (error) {
      console.error("Database connection error in getCachedHomeData:", error);
      return { services: [], successStories: [] };
    }
  },
  ['home-data-final'],
  { revalidate: 3600 }
);

const DEFAULT_STORIES = [
    {
        id: "f1",
        name: "Aisha Khan",
        feedback: "Infinity Overseas Consultant made my dream of studying in the UK a reality! Their team guided me through every step of the visa process.",
        image: "/img/student_1.png",
        country: "UK",
        visaType: "Study Visa",
        degree: "MSc Engineering Management",
        date: "12 Aug, 2025"
    },
    {
        id: "f2",
        name: "Ali Raza",
        feedback: "The process of applying to French universities seemed daunting, but Infinity made it seamless. Highly recommended!",
        image: "/img/student_2.png",
        country: "FRANCE",
        visaType: "Study Visa",
        degree: "Master's in Data Science",
        date: "05 Sep, 2025"
    },
    {
        id: "f3",
        name: "Fatima Noor",
        feedback: "Exceptional service! They provided all the right details for studying in Germany. I am so grateful for their support.",
        image: "/img/student_3.png",
        country: "GERMANY",
        visaType: "Study Visa",
        degree: "MBA",
        date: "22 Jul, 2025"
    },
    {
        id: "f4",
        name: "Hassan Tariq",
        feedback: "Italy has always been my dream destination. With Infinity Overseas, I got admission to a top university with a scholarship.",
        image: "/img/student_1.png",
        country: "ITALY",
        visaType: "Study Visa",
        degree: "BSc Computer Science",
        date: "18 Oct, 2025"
    },
    {
        id: "f5",
        name: "Sara Ahmed",
        feedback: "Highly professional consultancy. They helped me choose the right university and supported me throughout.",
        image: "/img/student_2.png",
        country: "AUSTRALIA",
        visaType: "Study Visa",
        degree: "Master's Degree",
        date: "10 Nov, 2025"
    },
    {
        id: "f6",
        name: "Usman Ahmed",
        feedback: "The guidance for Canadian universities was top-notch. I felt supported throughout the complicated application process.",
        image: "/img/student_3.png",
        country: "CANADA",
        visaType: "Study Visa",
        degree: "BEng Civil Engineering",
        date: "03 Dec, 2025"
    },
    {
        id: "f7",
        name: "Zainab Javed",
        feedback: "Studying in the USA was my ultimate goal. They helped me ace my visa interview and choose the right program.",
        image: "/img/student_1.png",
        country: "USA",
        visaType: "Study Visa",
        degree: "MSc Business Administration",
        date: "25 Jan, 2026"
    }
];

export default async function Home() {
  // ─ Fetch data server-side with caching (no API round-trip, no client waterfall) ─
  const { services, successStories: dbStories } = await getCachedHomeData();
  const successStories = dbStories.length > 0 ? dbStories : DEFAULT_STORIES;


  return (
    <>
      {/* Client-side scroll-reveal animations */}
      <RevealAnimations />

      {/* Flying Plane Animation */}
      <Reveal animation="fade-down" delay={0.5}>
        <FlyingPlaneWrapper />
      </Reveal>

      {/* Hero Section */}
      <section id="center" className="center_h hero_bg mb-0 overflow-hidden py-5 pt-md-6 pt-lg-7">
        <div className="center_m py-lg-5">
          <div className="container-xl">
            <div className="row center_1 px-3 align-items-center text-start">
              <div className="col-lg-10 mb-4">
                <Reveal animation="fade-down">
                  <div className="center_1l p-0">
                    <div className="accent-line mb-3"></div>
                    <h1 className="text-white mt-1 fw-bold lh-sm mb-0 hero-main-title">Trusted Experts in Study Abroad, <br className="d-none d-lg-block" /><span className="col_oran">Immigration & Visa Services</span></h1>
                  </div>
                </Reveal>
              </div>

              <div className="col-lg-12 mb-4">
                <Reveal animation="scale-in" delay={0.2}>
                  <div className="position-relative hero-poster-container ms-0">
                    <div className="rounded-4 overflow-hidden shadow-2xl border-gradient">
                      <Image 
                        src="/img/hero_poster.jpg" 
                        width={1600} 
                        height={600} 
                        className="w-100 hero-poster-img transition" 
                        alt="Study Abroad Global Destinations - Infinity Overseas" 
                        priority 
                      />
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="col-lg-7">
                <Reveal animation="fade-up" delay={0.3}>
                  <p className="mt-4 mb-5 text-light opacity-75 hero-desc">Infinity Overseas Consultants is Pakistan's premier Europe-focused education consultancy, headquartered in Faisalabad. From affordable European degrees to prestigious UK institutions, we provide end-to-end guidance for your international education journey &ndash; including visa processing, university admissions, and scholarship applications.</p>
                </Reveal>
              </div>

              <div className="col-lg-10 mt-4">
                <Reveal animation="fade-up" delay={0.4}>
                  <div className="d-flex flex-column flex-md-row gap-4 align-items-center hero-buttons">
                    <Magnetic>
                      <a className="button pulse-button bg_oran border-0 px-5 py-3 rounded-pill text-decoration-none text-white fw-bold shadow-lg fs-5" href="#consultation">Book Free Consultation <i className="fa fa-calendar ms-2"></i></a>
                    </Magnetic>
                    <Magnetic>
                      <a className="button_1 bg-transparent border-white px-5 py-3 rounded-pill text-decoration-none text-white fw-bold shadow-lg fs-5" href="/services/study-abroad">View European Destinations <i className="fa fa-globe ms-2"></i></a>
                    </Magnetic>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="p_5 bg-light">
        <div className="container-xl">
          <div className="row feature_1 text-center mb-5 mt_5">
            <div className="col-md-12">
              <Reveal animation="fade-up">
                <h4 className="col_green uppercase fw-bold">WHY EUROPE & UK?</h4>
                <h1 className="display-6 fw-bold mb-0 lh-sm section-main-title">Why Pakistani Students Choose <br className="d-none d-md-block" /><span className="col_oran d-block section-sub-title mt-2 mt-md-0">European & UK Education Through Infinity</span></h1>
                <p className="mt-4 lead text-muted mx-auto section-desc" style={{ maxWidth: '800px' }}>Welcome to Infinity Overseas Consultants &ndash; your dedicated partner for European and UK education. While many consultants focus on traditional destinations, we specialize in the diverse, high-quality, and affordable education opportunities available across Europe and the UK specifically for Pakistani students.</p>
              </Reveal>
            </div>
          </div>
          <div className="row feature_2 g-4 justify-content-center">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <Reveal animation="fade-up" delay={0.1} className="h-100">
                <div className="feature_2i feature_2i1 text-center border p-5 py-max rounded-4 shadow-sm transition h-100 bg-white hover-lift mx-auto" style={{ maxWidth: '650px', padding: '3rem 2rem' }}>
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-money"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2 fs-3">Affordable Excellence</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted fs-5" style={{ lineHeight: '1.6' }}>Study in Romania, Georgia, Hungary, or Lithuania for under €3,000/year.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <Reveal animation="fade-up" delay={0.2} className="h-100">
                <div className="feature_2i feature_2i2 text-center border p-5 py-max rounded-4 shadow-sm transition h-100 bg-white hover-lift mx-auto" style={{ maxWidth: '650px', padding: '3rem 2rem' }}>
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-university"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2 fs-3">Prestigious UK Degrees</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted fs-5" style={{ lineHeight: '1.6' }}>Access world-ranked British universities without breaking the bank.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <Reveal animation="fade-up" delay={0.3} className="h-100">
                <div className="feature_2i feature_2i3 text-center border p-5 py-max rounded-4 shadow-sm transition h-100 bg-white hover-lift mx-auto" style={{ maxWidth: '650px', padding: '3rem 2rem' }}>
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-map-o"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2 fs-3">Schengen Advantage</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted fs-5" style={{ lineHeight: '1.6' }}>Study in Sweden, Denmark, or Finland and travel across 27 European countries.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <Reveal animation="fade-up" delay={0.4} className="h-100">
                <div className="feature_2i feature_2i4 text-center border p-5 py-max rounded-4 shadow-sm transition h-100 bg-white hover-lift mx-auto" style={{ maxWidth: '650px', padding: '3rem 2rem' }}>
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-building"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2 fs-3">Strategic Hubs</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted fs-5" style={{ lineHeight: '1.6' }}>Build your career in Dubai or Turkey &ndash; bridges between East and West.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <Reveal animation="fade-up" delay={0.5} className="h-100">
                <div className="feature_2i feature_2i1 text-center border p-5 py-max rounded-4 shadow-sm transition h-100 bg-white hover-lift mx-auto" style={{ maxWidth: '650px', padding: '3rem 2rem' }}>
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-language"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2 fs-3">English-Taught Programs</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted fs-5" style={{ lineHeight: '1.6' }}>Study in English across Malta, Cyprus, Spain, Italy, and Scandinavia.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-6">
              <Reveal animation="fade-up" delay={0.6} className="h-100">
                <div className="feature_2i feature_2i3 text-center border p-5 py-max rounded-4 shadow-sm transition h-100 bg-white hover-lift mx-auto" style={{ maxWidth: '650px', padding: '3rem 2rem' }}>
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-suitcase"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2 fs-3">Post-Study Work Rights</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted fs-5" style={{ lineHeight: '1.6' }}>2-year graduate visas in UK, 1-2 year stays across Europe.</p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <Reveal animation="fade-up" delay={0.7}>
                <div className="p-5 py-max bg-white rounded-4 border shadow-sm mx-auto position-relative" style={{ maxWidth: '650px', padding: '4rem 2rem !important' }}>
                  <i className="fa fa-quote-left display-3 col_oran opacity-10 position-absolute top-0 start-0 mt-3 ms-4 quote-icon-mobile"></i>
                  <p className="lead text-dark mb-0 fw-medium position-relative section-desc" style={{ fontSize: '1.2rem', lineHeight: '1.7', zIndex: 1 }}>With partnerships across <strong>200+ universities in 16 countries</strong> and specialized expertise in European student visas, Infinity Overseas ensures your pathway to Europe is smooth, affordable, and successful.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Global Expertise */}
      <section id="our-mission" className="p_5 bg-light overflow-hidden">
        <div className="container-xl">
          <div className="row align-items-center g-5 mt_5">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <Reveal animation="scale-in">
                <div className="position-relative">
                  <Image src="/img/global_campus.png" width={600} height={600} className="w-100 rounded-4 shadow-lg hover-zoom transition" alt="Global Education Campus" style={{ height: '550px', objectFit: 'cover' }} />
                  <div className="position-absolute top-0 start-0 m-4 badge bg_green p-3 shadow-lg rounded-pill">
                    <h6 className="mb-0 fw-bold">12+ Years Experience</h6>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 ps-xl-5">
              <Reveal animation="fade-left">
                <h4 className="col_green uppercase fw-bold">GLOBAL EXPERTISE</h4>
                <h2 className="fw-bold mt-2 display-4">Bridging The Gap To World-Class Education</h2>
                <p className="mt-4 lead text-muted section-desc" style={{ lineHeight: '1.8' }}>At Infinity Overseas Consultant, we specialize in bridging the gap between ambitious students and the world's most prestigious universities. Our legacy is built on a decade of trust, ensuring that every student who walks through our doors is given a clear path to their international academic dreams.</p>
                <div className="row mt-5 g-4 justify-content-center">
                  {[
                    { end: 99, suffix: "%", label: "Satisfaction", color: "success" },
                    { end: 500, suffix: "+", label: "Partners", color: "warning" },
                    { end: 10, suffix: "k+", label: "Students", color: "info" }
                  ].map((stat, i) => (
                    <div key={i} className="col-6 col-md-4">
                      <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                        <div className={`p-5 py-5 bg-white rounded-4 shadow-sm border-bottom border-4 border-${stat.color} hover-lift transition h-100 mobile-stat-box text-center mx-auto d-flex flex-column align-items-center justify-content-center`} style={{ maxWidth: '650px', padding: '4rem 2rem !important' }}>
                          <h3 className="fw-bold col_oran mb-1">
                            <StatCounter end={stat.end} suffix={stat.suffix} />
                          </h3>
                          <p className="text-muted mb-0 small text-uppercase fw-bold ls-1 mobile-stat-label">{stat.label}</p>
                        </div>
                      </Reveal>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Vision (Alternating) */}
      <section id="our-vision" className="p_5 bg-white overflow-hidden">
        <div className="container-xl">
          <div className="row align-items-center flex-row-reverse g-5 mt_5">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <Reveal animation="scale-in">
                <div className="position-relative">
                  <Image src="/img/our_vision_main.png" width={600} height={600} className="w-100 rounded-4 shadow-lg hover-zoom transition" alt="Our Vision" style={{ height: '600px', objectFit: 'cover' }} />
                  <div className="position-absolute bottom-0 end-0 m-4 bg_oran text-white p-4 shadow-2xl rounded-4" style={{ maxWidth: '280px' }}>
                    <p className="mb-0 italic lead text-white" style={{ fontSize: '0.9rem' }}>"Empowering the next generation of global leaders through accessible, world-class education."</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 pe-xl-5">
              <Reveal animation="fade-right">
                <h4 className="col_oran uppercase fw-bold">OUR VISION</h4>
                <h2 className="fw-bold mt-2 display-4">A Future Where Education Knows No Borders</h2>
                <div className="line bg_green mb-4" style={{ width: '80px', height: '4px' }}></div>
                <p className="mt-4 lead text-muted section-desc" style={{ lineHeight: '1.8' }}>Our vision is to become the most trusted global gateway for education and immigration services. We foresee a world where every talented individual has the opportunity to study at the world's finest institutions.</p>
                <div className="space-y-4 mt-5">
                  {[
                    "Establishing global education hubs in Every Region",
                    "Democratizing access to high-tier UK & USA degrees",
                    "Pioneering a 100% digital success-tracking system"
                  ].map((text, i) => (
                    <div key={i} className="mb-3 d-flex align-items-center">
                      <Magnetic>
                        <i className="fa fa-check-circle col_green fs-4 me-3"></i>
                      </Magnetic>
                      <span className="fw-bold fs-5">{text}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Mission (Dedicated) */}
      <section id="dedicated-mission" className="p_5 bg-light overflow-hidden">
        <div className="container-xl">
          <div className="row align-items-center g-5 mt_5">
            <div className="col-xl-6 col-lg-12 col-md-12">
              <Reveal animation="scale-in">
                <div className="position-relative">
                  <Image src="/img/our_mission_main.png" width={600} height={600} className="w-100 rounded-4 shadow-lg hover-zoom transition" alt="Our Mission" style={{ height: '550px', objectFit: 'cover' }} />
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <Magnetic>
                      <span className="btn-play bg-white rounded-circle shadow-lg d-flex align-items-center justify-content-center hover-up transition" style={{ width: '100px', height: '100px', color: '#FF7700' }}>
                        <i className="fa fa-play fs-1"></i>
                      </span>
                    </Magnetic>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 ps-xl-5">
              <Reveal animation="fade-left">
                <h4 className="col_green uppercase fw-bold">OUR MISSION</h4>
                <h2 className="fw-bold mt-2 display-4">Commitment to Integrity & Student Success</h2>
                <p className="mt-4 lead text-muted section-desc" style={{ lineHeight: '1.8' }}>Our mission at Infinity is to provide accurate, ethical, and personalized international consultancy services that empower students to achieve their academic and professional goals.</p>
                <div className="row mt-5 g-5 justify-content-center">
                  {[
                    { icon: "shield", color: "oran", title: "Ethical Excellence", desc: "We maintain the highest standards of transparency in every visa and admission application." },
                    { icon: "users", color: "green", title: "Personalized Guidance", desc: "We tailor our strategy to each individual's academic history, budget, and future career aspirations." }
                  ].map((item, i) => (
                    <div key={i} className="col-md-12">
                      <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start text-center text-md-start p-5 py-5 rounded-4 bg-white shadow-sm hover-lift transition mx-auto" style={{ maxWidth: '950px', padding: '4rem !important' }}>
                        <Magnetic>
                          <div className={`flex-shrink-0 bg_${item.color} text-white rounded-circle p-4 mb-4 mb-md-0 me-md-4 d-flex align-items-center justify-content-center shadow-lg`} style={{ width: '70px', height: '70px' }}>
                            <i className={`fa fa-${item.icon} fs-3`}></i>
                          </div>
                        </Magnetic>
                        <div>
                          <h5 className="fw-bold mb-2">{item.title}</h5>
                          <p className="text-secondary mb-0">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-center text-xl-start">
                  <div className="mx-auto mx-xl-0" style={{ maxWidth: '350px' }}>
                    <Magnetic>
                      <Link href="/consultation" className="btn bg_oran text-white px-4 px-md-5 py-3 rounded-pill fw-bold shadow-lg hover-up transition pulse-button d-inline-flex align-items-center justify-content-center text-nowrap w-100">Partner With Us Today <i className="fa fa-arrow-right ms-2 flex-shrink-0"></i></Link>
                    </Magnetic>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="p_5 bg-white">
        <div className="container-xl">
          <div className="row feature_1 text-center mb-5 mt_5">
            <div className="col-md-12">
              <Reveal animation="fade-up">
                <h4 className="col_green uppercase fw-bold">OUR SERVICES</h4>
                <h1 className="display-4 fw-bold mb-0 section-main-title">Expert Immigration & <span className="col_oran">Study Abroad</span></h1>
              </Reveal>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {services.map((service, i) => (
              <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                <Reveal animation="fade-up" delay={(i % 3) * 0.1} className="h-100">
                  <div className="card border p-4 py-4 shadow-sm h-100 text-center hover-lift transition bg-light rounded-4 d-flex flex-column mx-auto" style={{ maxWidth: '650px', minHeight: '420px', padding: '3.5rem 2rem !important' }}>
                    <Magnetic>
                      <div className="mb-4 d-inline-block p-4 rounded-circle bg-white shadow-sm mx-auto">
                        <i className={`fa fa-${service.icon || 'globe'} fa-3x col_oran`} aria-hidden="true"></i>
                      </div>
                    </Magnetic>
                    <h4 className="fw-bold mb-3">{service.title}</h4>
                    <p className="text-muted mb-4">{service.description}</p>
                    <div className="mt-auto">
                      <Link href="/services/study-abroad" className="col_green fw-bold text-decoration-none hover-up transition d-inline-block">Read More <i className="fa fa-arrow-right ms-2" aria-hidden="true"></i></Link>
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Anywhere */}
      <section id="study-anywhere" className="p_5 study_abroad_bg text-white overflow-hidden">
        <div className="container-xl py-5">
          <div className="row align-items-center g-5">
            <div className="col-xl-6 text-center text-xl-start">
              <Reveal animation="fade-left">
                <h4 className="col_oran uppercase fw-bold ls-1">STUDY ABROAD</h4>
                <h1 className="display-3 fw-bold mt-2 section-main-title">Study Anywhere, <span className="text-white section-sub-title">Start Here</span></h1>
                <p className="mt-4 lead opacity-75 hero-desc text-mobile-center">Infinity Overseas Consultants helps students study in top countries like the UK, Canada, USA, and Australia. We offer trusted support with university selection, visa applications, and scholarship guidance — making your study abroad journey easy and successful.</p>
                <div className="mt-5 d-flex flex-column flex-xl-row align-items-center justify-content-xl-start gap-3 w-100">
                  {["100% Admission Success", "Scholarship Support", "Visa Guidance"].map((badge, i) => (
                    <div key={i} className="w-100 w-xl-auto badge-magnetic text-center" style={{ maxWidth: '350px' }}>
                      <Magnetic>
                        <span className="badge bg-white text-dark px-4 py-3 rounded-pill shadow-sm border-0 fs-6 fw-bold w-100 d-block d-xl-inline-block text-center">{badge}</span>
                      </Magnetic>
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-center text-xl-start">
                  <div className="mx-auto mx-xl-0" style={{ maxWidth: '350px' }}>
                    <Magnetic>
                      <Link href="/destinations" className="btn bg_oran text-white px-3 px-md-5 py-3 rounded-pill fw-bold shadow-lg hover-up transition pulse-button d-inline-flex align-items-center justify-content-center flex-nowrap w-100">View Destinations <i className="fa fa-globe ms-2 flex-shrink-0"></i></Link>
                    </Magnetic>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-xl-6">
              <Reveal animation="scale-in">
                <div className="row g-4 destination-grid">
                  {["UK", "Canada", "USA", "Australia"].map((name, i) => (
                    <div key={i} className="col-12 col-sm-6">
                      <Link href="/services/study-abroad" className="text-decoration-none">
                        <div className="position-relative overflow-hidden rounded-4 shadow-lg hover-lift transition h-100 group">
                          <Image src={`/img/study_${name.toLowerCase()}.png`} width={300} height={400} className="w-100 group-hover-zoom transition" alt={`Study in ${name}`} style={{ height: '220px', objectFit: 'cover' }} />
                          <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                            <h6 className="mb-0 fw-bold text-white" style={{ fontSize: '1.1rem' }}>{name}</h6>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>



      {/* Testimonials */}
      <section id="testimonials" className="p_5 bg-white">
        <div className="container-xl">
          <div className="row feature_1 text-center mb-5 mt_5">
            <div className="col-md-12">
              <Reveal animation="fade-up">
                <h4 className="col_green uppercase fw-bold">SUCCESS STORIES</h4>
                <h1 className="display-4 fw-bold mb-0 section-main-title">Client Interviews & <span className="col_oran">Success Stories</span></h1>
              </Reveal>
            </div>
          </div>
          <div className="row">
            <div className="col-12 px-0">
              <Reveal animation="fade-up">
                <SuccessStorySlider stories={successStories} />
              </Reveal>
            </div>
          </div>
          <div className="text-center mt-5">
            <Reveal animation="fade-up">
              <Magnetic>
                <Link href="/testimonials" className="btn btn-outline-success px-3 px-md-5 py-3 rounded-pill fw-bold hover-up transition d-inline-flex align-items-center flex-nowrap">View More Success Stories <i className="fa fa-chevron-right ms-2 flex-shrink-0"></i></Link>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Eligibility Checker */}
      <section id="eligibility" className="p_5 bg-light overflow-hidden">
        <div className="container-xl">
          <div className="row feature_1 text-center mb-5 mt_5">
            <div className="col-md-12">
              <Reveal animation="fade-up">
                <h4 className="col_green uppercase fw-bold">ELIGIBILITY CHECKER</h4>
                <h1 className="display-4 fw-bold mb-0 section-main-title">Check Your Admission <span className="col_oran">Chances</span></h1>
                <p className="mt-3 lead text-muted max-w-2xl mx-auto">A quick assessment to see if you qualify for study abroad in your dream destination.</p>
              </Reveal>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-9">
              <Reveal animation="scale-in" delay={0.2}>
                <div className="card border-0 shadow-2xl p-4 p-md-5 rounded-4 overflow-hidden position-relative hover-lift transition bg-white">
                  <EligibilityForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>




      {/* CTA */}
      <section id="consultation" className="cta_bg text-white text-center py-4">
        <div className="container-xl py-4">
          <Reveal animation="scale-in">
            <h1 className="display-4 fw-bold mb-4 section-main-title">Expert Advice Just One <span className="col_oran">Call Away!</span></h1>
            <p className="mt-4 lead text-white max-w-2xl mx-auto mb-5 text-mobile-center hero-desc">
              Speak with Our Experts – Contact Us Now
            </p>
            <div className="text-center">
              <Magnetic>
                <div className="d-inline-block w-100 w-md-auto badge-magnetic" style={{ maxWidth: '500px' }}>
                  <Link className="btn btn-light text-dark border-0 px-4 py-3 fs-6 fw-bold rounded-pill shadow-2xl hover-up transition d-inline-flex align-items-center justify-content-center w-100" style={{ letterSpacing: '0.1px', whiteSpace: 'nowrap' }} href="/consultation">
                    Book Free Consultation Now <i className="fa fa-calendar ms-2 flex-shrink-0"></i>
                  </Link>
                </div>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
