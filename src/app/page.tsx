import Link from 'next/link';
import Image from 'next/image';
import StatCounter from '@/components/StatCounter';
import FlyingPlane from '@/components/FlyingPlane';
import EligibilityForm from '@/components/EligibilityForm';
import RevealAnimations, { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import StudyAbroadAnimation from '@/components/StudyAbroadAnimation';
import SuccessStorySlider from '@/components/SuccessStorySlider';
import VideoSection from '@/components/VideoSection';
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';
import "../styles/index.css";

export const revalidate = 3600; // Cache homepage for 1 hour

// Cache DB queries — avoids hitting database on every request
const getCachedHomeData = unstable_cache(
  async () => {
    try {
      const [services, successStories, videos] = await Promise.all([
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
        }),
        // Safely check if video model exists on prisma client
        (prisma as any).video ? (prisma as any).video.findMany({ take: 10 }) : Promise.resolve([])
      ]);
      return { services, successStories, videos };
    } catch (error) {
      console.error("Database connection error in getCachedHomeData:", error);
      return { services: [], successStories: [], videos: [] };
    }
  },
  ['home-page-data'],
  { revalidate: 3600 } // Cache for 1 hour
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
        name: "Sana Malik",
        feedback: "Got my visa for Australia in record time thanks to the dedicated team at IO Consultants. Best consultants in town!",
        image: "/img/student_2.png",
        country: "AUSTRALIA",
        visaType: "Study Visa",
        degree: "Master of Public Health",
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
  const { services, successStories: dbStories, videos } = await getCachedHomeData();
  const successStories = dbStories.length > 0 ? dbStories : DEFAULT_STORIES;


  return (
    <>
      {/* Client-side scroll-reveal animations */}
      <RevealAnimations />

      {/* Flying Plane Animation */}
      <Reveal animation="fade-down" delay={0.5}>
        <FlyingPlane />
      </Reveal>

      {/* Hero Section */}
      <section id="center" className="center_h hero_bg mb-0 overflow-hidden">
        <div className="center_m">
          <div className="container-xl">
            <div className="row center_1 px-3 align-items-center">
              <div className="col-md-7">
                <Reveal animation="fade-up">
                  <div className="center_1l">

                    <h1 className="text-white mt-1 display-3 fw-bold lh-sm mb-4" style={{ fontSize: '2.5rem' }}>Your Gateway to World-Class Education / Visits / Immigration in UK, Ireland, Scandinavian, Mediterranean Europe & Beyond<br /><span className="col_oran fs-4 mt-2 d-block">Expert Student Visa Services in Faisalabad, Pakistan</span></h1>
                    <p className="mt-4 mb-5 text-light opacity-75" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Infinity Overseas Consultants is Pakistan's premier Europe-focused education consultancy, headquartered in Faisalabad. We specialize in placing Pakistani students in top universities across the United Kingdom, Ireland, Sweden, Denmark, Finland, France, Italy, Spain, Malta, Cyprus, Romania, Hungary, Lithuania, Turkey, Georgia, and Dubai (UAE).<br /><br />From affordable European degrees to prestigious UK institutions, we provide end-to-end guidance for your international education journey &ndash; including visa processing, university admissions, and scholarship applications for both Schengen and non-Schengen European destinations.</p>
                    <div className="d-flex flex-wrap gap-3">
                      <Magnetic>
                        <a className="button pulse-button bg_oran border-0 px-4 py-3 rounded-pill text-decoration-none text-white fw-bold shadow-lg" href="#consultation">Book Free Consultation <i className="fa fa-calendar ms-2"></i></a>
                      </Magnetic>
                      <Magnetic>
                        <a className="button_1 bg-transparent border-white px-4 py-3 rounded-pill text-decoration-none text-white fw-bold shadow-lg" href="/services/study-abroad">Explore European Destinations <i className="fa fa-globe ms-2"></i></a>
                      </Magnetic>
                    </div>
                  </div>
                </Reveal>
              </div>
              <div className="col-md-5 mt-5 mt-md-0">
                <Reveal animation="scale-in" delay={0.3}>
                  <div className="center_1r position-relative">
                    <div className="grid clearfix">
                      <figure className="effect-jazz mb-0 overflow-hidden rounded-4 shadow-2xl">
                        <Image src="/img/hero_main.png" width={600} height={900} className="w-100 hero-main-img hover-zoom transition" alt="Infinity Overseas Consultants - Best Study Abroad Experts in Faisalabad" priority />
                      </figure>
                    </div>
                    <div className="position-absolute top-100 start-0 translate-middle mt-n5 ms-4 bg-white p-3 rounded-4 shadow-lg d-none d-lg-block">
                      <div className="d-flex align-items-center">
                        <i className="fa fa-users fs-3 col_green me-3"></i>
                        <div>
                          <h6 className="mb-0 fw-bold">10k+ Students</h6>
                          <small className="text-muted">Directly Assisted</small>
                        </div>
                      </div>
                    </div>
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
                <h1 className="display-6 fw-bold mb-0 lh-sm">Why Pakistani Students Choose <br /><span className="col_oran">European & UK Education Through Infinity</span></h1>
                <p className="mt-4 lead text-muted mx-auto" style={{ maxWidth: '800px', lineHeight: '1.8' }}>Welcome to Infinity Overseas Consultants &ndash; your dedicated partner for European and UK education. While many consultants focus on traditional destinations, we specialize in the diverse, high-quality, and affordable education opportunities available across Europe and the UK specifically for Pakistani students.</p>
              </Reveal>
            </div>
          </div>
          <div className="row feature_2 g-4">
            <div className="col-md-4">
              <Reveal animation="fade-up" delay={0.1}>
                <div className="feature_2i feature_2i1 text-center border p-5 rounded-4 shadow-sm transition h-100 bg-white hover-lift">
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-money"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2">Affordable Excellence</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>Study in Romania, Georgia, Hungary, or Lithuania for under €3,000/year.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-md-4">
              <Reveal animation="fade-up" delay={0.2}>
                <div className="feature_2i feature_2i2 text-center border p-5 rounded-4 shadow-sm transition h-100 bg-white hover-lift">
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-university"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2">Prestigious UK Degrees</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>Access world-ranked British universities without breaking the bank.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-md-4">
              <Reveal animation="fade-up" delay={0.3}>
                <div className="feature_2i feature_2i3 text-center border p-5 rounded-4 shadow-sm transition h-100 bg-white hover-lift">
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-map-o"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2">Schengen Advantage</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>Study in Sweden, Denmark, or Finland and travel across 27 European countries.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-md-4">
              <Reveal animation="fade-up" delay={0.4}>
                <div className="feature_2i feature_2i4 text-center border p-5 rounded-4 shadow-sm transition h-100 bg-white hover-lift">
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-building"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2">Strategic Hubs</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>Build your career in Dubai or Turkey &ndash; bridges between East and West.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-md-4">
              <Reveal animation="fade-up" delay={0.5} className="h-100">
                <div className="feature_2i feature_2i1 text-center border p-5 rounded-4 shadow-sm transition h-100 bg-white hover-lift">
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-language"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2">English-Taught Programs</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>Study in English across Malta, Cyprus, Spain, Italy, and Scandinavia.</p>
                </div>
              </Reveal>
            </div>
            <div className="col-md-4">
              <Reveal animation="fade-up" delay={0.6} className="h-100">
                <div className="feature_2i feature_2i3 text-center border p-5 rounded-4 shadow-sm transition h-100 bg-white hover-lift">
                  <Magnetic>
                    <span className="radius_10 d-inline-flex align-items-center justify-content-center mb-4 transition shadow-sm rounded-circle"><i className="fa fa-suitcase"></i></span>
                  </Magnetic>
                  <h4 className="fw-bold mt-2">Post-Study Work Rights</h4>
                  <hr className="line mx-auto mb-4 opacity-20" />
                  <p className="mb-0 text-muted" style={{ fontSize: '0.95rem' }}>2-year graduate visas in UK, 1-2 year stays across Europe.</p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <Reveal animation="fade-up" delay={0.7}>
                <div className="p-4 p-md-5 bg-white rounded-4 border shadow-sm mx-auto position-relative" style={{ maxWidth: '900px' }}>
                  <i className="fa fa-quote-left display-3 col_oran opacity-10 position-absolute top-0 start-0 mt-3 ms-4"></i>
                  <p className="lead text-dark mb-0 fw-medium position-relative" style={{ fontSize: '1.15rem', lineHeight: '1.7', zIndex: 1 }}>With partnerships across <strong>200+ universities in 16 countries</strong> and specialized expertise in European student visas, Infinity Overseas ensures your pathway to Europe is smooth, affordable, and successful.</p>
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
            <div className="col-md-6">
              <Reveal animation="scale-in">
                <div className="position-relative">
                  <Image src="/img/global_campus.png" width={600} height={600} className="w-100 rounded-4 shadow-lg hover-zoom transition" alt="Global Education Campus" style={{ height: '550px', objectFit: 'cover' }} />
                  <div className="position-absolute top-0 start-0 m-4 badge bg_green p-3 shadow-lg rounded-pill">
                    <h6 className="mb-0 fw-bold">12+ Years Experience</h6>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-md-6 ps-md-5">
              <Reveal animation="fade-left">
                <h4 className="col_green uppercase fw-bold">GLOBAL EXPERTISE</h4>
                <h2 className="fw-bold mt-2 display-4">Bridging The Gap To World-Class Education</h2>
                <p className="mt-4 lead text-muted" style={{ lineHeight: '1.8' }}>At Infinity Overseas Consultant, we specialize in bridging the gap between ambitious students and the world's most prestigious universities. Our legacy is built on a decade of trust, ensuring that every student who walks through our doors is given a clear path to their international academic dreams.</p>
                <div className="row mt-5 g-4">
                  {[
                    { end: 99, suffix: "%", label: "Satisfaction", color: "success" },
                    { end: 500, suffix: "+", label: "Partners", color: "warning" },
                    { end: 10, suffix: "k+", label: "Students", color: "info" }
                  ].map((stat, i) => (
                    <div key={i} className="col-4">
                      <Reveal animation="fade-up" delay={i * 0.1} className="h-100">
                        <div className={`p-4 bg-white rounded-4 shadow-sm border-bottom border-4 border-${stat.color} hover-lift transition h-100`}>
                          <h3 className="fw-bold col_oran mb-1">
                            <StatCounter end={stat.end} suffix={stat.suffix} />
                          </h3>
                          <p className="text-muted mb-0 small text-uppercase fw-bold ls-1">{stat.label}</p>
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
            <div className="col-md-6">
              <Reveal animation="scale-in">
                <div className="position-relative">
                  <Image src="/img/our_vision_main.png" width={600} height={600} className="w-100 rounded-4 shadow-lg hover-zoom transition" alt="Our Vision" style={{ height: '600px', objectFit: 'cover' }} />
                  <div className="position-absolute bottom-0 end-0 m-4 bg_oran text-white p-4 shadow-2xl rounded-4" style={{ maxWidth: '280px' }}>
                    <p className="mb-0 italic lead" style={{ fontSize: '0.9rem' }}>"Empowering the next generation of global leaders through accessible, world-class education."</p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="col-md-6 pe-md-5">
              <Reveal animation="fade-right">
                <h4 className="col_oran uppercase fw-bold">OUR VISION</h4>
                <h2 className="fw-bold mt-2 display-4">A Future Where Education Knows No Borders</h2>
                <div className="line bg_green mb-4" style={{ width: '80px', height: '4px' }}></div>
                <p className="mt-4 lead text-muted" style={{ lineHeight: '1.8' }}>Our vision is to become the most trusted global gateway for education and immigration services. We foresee a world where every talented individual has the opportunity to study at the world's finest institutions.</p>
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
            <div className="col-md-6">
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
            <div className="col-md-6 ps-md-5">
              <Reveal animation="fade-left">
                <h4 className="col_green uppercase fw-bold">OUR MISSION</h4>
                <h2 className="fw-bold mt-2 display-4">Commitment to Integrity & Student Success</h2>
                <p className="mt-4 lead text-muted" style={{ lineHeight: '1.8' }}>Our mission at Infinity is to provide accurate, ethical, and personalized international consultancy services that empower students to achieve their academic and professional goals.</p>
                <div className="row mt-5 g-5">
                  {[
                    { icon: "shield", color: "oran", title: "Ethical Excellence", desc: "We maintain the highest standards of transparency in every visa and admission application." },
                    { icon: "users", color: "green", title: "Personalized Guidance", desc: "We tailor our strategy to each individual's academic history, budget, and future career aspirations." }
                  ].map((item, i) => (
                    <div key={i} className="col-md-12">
                      <div className="d-flex p-4 rounded-4 bg-white shadow-sm hover-lift transition">
                        <Magnetic>
                          <div className={`flex-shrink-0 bg_${item.color} text-white rounded-circle p-4 me-4 d-flex align-items-center justify-content-center shadow-lg`} style={{ width: '70px', height: '70px' }}>
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
                <div className="mt-5">
                  <Magnetic>
                    <Link href="/consultation" className="btn bg_oran text-white px-5 py-3 rounded-pill fw-bold shadow-lg hover-up transition pulse-button">Partner With Us Today <i className="fa fa-arrow-right ms-2"></i></Link>
                  </Magnetic>
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
                <h1 className="display-4 fw-bold mb-0">Expert Immigration & <span className="col_oran">Study Abroad</span></h1>
              </Reveal>
            </div>
          </div>
          <div className="row g-4">
            {services.map((service, i) => (
              <div key={i} className="col-md-4">
                <Reveal animation="fade-up" delay={(i % 3) * 0.1} className="h-100">
                  <div className="card border p-5 shadow-sm h-100 text-center hover-lift transition bg-light rounded-4 d-flex flex-column">
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
            <div className="col-lg-6 text-center text-lg-start">
              <Reveal animation="fade-left">
                <h4 className="col_oran uppercase fw-bold ls-1">STUDY ABROAD</h4>
                <h1 className="display-3 fw-bold mt-2">Study Anywhere, <span className="text-white">Start Here</span></h1>
                <p className="mt-4 lead opacity-75" style={{ lineHeight: '1.8' }}>Infinity Overseas Consultants helps students study in top countries like the UK, Canada, USA, and Australia. We offer trusted support with university selection, visa applications, and scholarship guidance — making your study abroad journey easy and successful.</p>
                <div className="mt-5 d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                  {["100% Admission Success", "Scholarship Support", "Visa Guidance"].map((badge, i) => (
                    <Magnetic key={i}>
                      <span className="badge bg-white text-dark px-4 py-3 rounded-pill shadow-sm border-0 fs-6 fw-bold">{badge}</span>
                    </Magnetic>
                  ))}
                </div>
                <div className="mt-5">
                  <Magnetic>
                    <Link href="/destinations" className="btn bg_oran text-white px-5 py-3 rounded-pill fw-bold shadow-lg hover-up transition pulse-button">Explore Destinations <i className="fa fa-globe ms-2"></i></Link>
                  </Magnetic>
                </div>
              </Reveal>
            </div>
            <div className="col-lg-6">
              <Reveal animation="scale-in">
                <div className="row g-4 destination-grid">
                  {[
                    { img: "study_uk.png", name: "UK", href: "/services/study-abroad" },
                    { img: "study_canada.png", name: "Canada", href: "/services/study-abroad" },
                    { img: "study_usa.png", name: "USA", href: "/services/study-abroad" },
                    { img: "study_australia.png", name: "Australia", href: "/services/study-abroad" }
                  ].map((dest, i) => (
                    <div key={i} className="col-6">
                      <Link href={dest.href} className="text-decoration-none">
                        <div className="position-relative overflow-hidden rounded-4 shadow-lg hover-lift transition h-100 group">
                          <Image src={`/img/${dest.img}`} width={300} height={400} className="w-100 group-hover-zoom transition" alt={`Study in ${dest.name}`} style={{ height: '250px', objectFit: 'cover' }} />
                          <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                            <h6 className="mb-0 fw-bold text-white" style={{ fontSize: '1.1rem' }}>{dest.name}</h6>
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
                <h1 className="display-4 fw-bold mb-0">Our Students <span className="col_oran">Success Stories</span></h1>
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
                <Link href="/testimonials" className="btn btn-outline-success px-5 py-3 rounded-pill fw-bold hover-up transition">View More Success Stories <i className="fa fa-chevron-right ms-2"></i></Link>
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
                <h1 className="display-4 fw-bold mb-0">Check Your Admission <span className="col_oran">Chances</span></h1>
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


      {/* Video Section */}
      <VideoSection videos={videos as any} />

      {/* CTA */}
      <section id="consultation" className="p_5 cta_bg text-white text-center py-5">
        <div className="container-xl py-5">
          <Reveal animation="scale-in">
            <h1 className="display-4 fw-bold mb-4">Ready to Take the First Step?</h1>
            <p className="mt-4 lead opacity-90 max-w-2xl mx-auto mb-5" style={{ fontSize: '1.25rem' }}>Let Infinity Overseas Consultant help you study, work, or settle abroad with expert career counseling and visa guidance.</p>
            <Magnetic>
              <Link className="btn btn-light text-dark border-0 px-5 py-3 fs-4 fw-bold rounded-pill shadow-2xl pulse-button hover-up transition" href="/consultation">Book Free Consultation Now <i className="fa fa-calendar ms-2"></i></Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
