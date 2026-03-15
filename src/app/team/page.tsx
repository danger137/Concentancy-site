import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
    title: "Meet Our Team | Infinity Overseas Consultants",
    description: "Get to know the experts at Infinity Overseas Consultants. Our team of experienced professionals is dedicated to guiding you through your study abroad and immigration journey.",
    keywords: ["Infinity Overseas Team", "Khurram Hashmi", "Immigration Consultants Faisalabad", "Study Abroad Experts"],
};

export const revalidate = 3600; // Revalidate every hour

const getCachedTeamMembers = unstable_cache(
    async () => prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } }),
    ['team-members-data'],
    { revalidate: 3600 }
);

export default async function Team() {
    const allMembers = await getCachedTeamMembers();

    const ceo = allMembers.find(m => m.isCeo);
    const otherMembers = allMembers.filter(m => !m.isCeo);

    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                                <Reveal animation="fade-down">
                                <h1 className="text-white h-100 w-100">Our Team</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Our Team
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Elite Leadership Section (CEO) */}
            {ceo && (
                <section id="ceo-leadership" className="p_5 bg-white border-bottom mt_5">
                                <div className="container-xl d-flex flex-column">
                        <div className="row align-items-center g-5">
                            <div className="col-lg-5 text-center">
                                <Reveal animation="scale-in">
                                    <div className="position-relative d-inline-block">
                                        <Image
                                            src={ceo.image || "/founder.jpg"}
                                            alt={ceo.name}
                                            width={450}
                                            height={550}
                                            className="rounded-4 shadow-lg w-100 hover-zoom transition"
                                            style={{ objectFit: 'cover', maxWidth: '450px' }}
                                        />
                                        <div className="position-absolute bottom-0 end-0 bg_oran text-white p-4 rounded-start shadow-lg">
                                            <h4 className="mb-0 fw-bold">Founder & CEO</h4>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                            <div className="col-lg-7 ps-lg-5">
                                <Reveal animation="fade-left">
                                    <h4 className="col_green uppercase fw-bold ls-2">Elite Leadership</h4>
                                    <h1 className="display-4 fw-bold mt-2 mb-4">{ceo.name}</h1>
                                    <div className="ceo-bio lead text-muted pe-lg-5 mb-5" style={{ lineHeight: '1.8' }}>
                                        {ceo.description.split('\n\n').map((para, i) => (
                                            <p key={i} className="mb-4">{para}</p>
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <h6 className="fw-bold uppercase text-muted mb-4 ls-1">Connect with our Leader</h6>
                                        <div className="d-flex gap-4">
                                            <Magnetic><a className="col_oran fs-3 hover-up transition" href={ceo.twitter || "#"}><i className="fa fa-twitter"></i></a></Magnetic>
                                            <Magnetic><a className="text-danger fs-3 hover-up transition" href={ceo.instagram || "#"}><i className="fa fa-instagram"></i></a></Magnetic>
                                            <Magnetic><a className="col_blue fs-3 hover-up transition" href={ceo.linkedin || "#"}><i className="fa fa-linkedin"></i></a></Magnetic>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            <section id="team" className="p_5 bg-light">
                <div className="container-xl">
                    <div className="row team_1 text-center mb-5 mt_5">
                        <div className="col-md-12">
                            <Reveal animation="fade-up">
                                <h4 className="col_green uppercase fw-bold">OUR EXPERTS</h4>
                                <h2 className="display-4 fw-bold mb-3">Meet the Professionals</h2>
                                <p className="lead text-muted max-w-2xl mx-auto">A group of experienced individuals committed to your academic success and global future.</p>
                            </Reveal>
                        </div>
                    </div>
                    <div className="row team_1 g-4">
                        {otherMembers.length > 0 ? (
                            otherMembers.map((person, index) => (
                                <div key={index} className="col-md-4 mb-4">
                                    <Reveal animation="fade-up" delay={(index % 3) * 0.1}>
                                        <div className="team_1i clearfix position-relative bg-white rounded-4 shadow-sm p-4 h-100 border hover-lift transition">
                                            <div className="team_1i1 clearfix text-center mb-4">
                                                <Magnetic>
                                                    <Image
                                                        src={person.image}
                                                        alt={person.name}
                                                        width={200}
                                                        height={200}
                                                        className="rounded-circle shadow-sm mx-auto border p-1 hover-zoom transition"
                                                        style={{ objectFit: 'cover', width: '180px', height: '180px' }}
                                                    />
                                                </Magnetic>
                                            </div>
                                            <div className="text-center">
                                                <h4 className="fw-bold mb-1">{person.name}</h4>
                                                <h6 className="text-uppercase col_oran small fw-bold mb-4">{person.role}</h6>
                                                <p className="text-muted small mb-4">{person.description}</p>
                                                <div className="d-flex justify-content-center gap-3 mt-4">
                                                    <Magnetic><a className="col_blue fs-5 hover-up transition" href={person.twitter || "#"}><i className="fa fa-twitter"></i></a></Magnetic>
                                                    <Magnetic><a className="text-danger fs-5 hover-up transition" href={person.instagram || "#"}><i className="fa fa-instagram"></i></a></Magnetic>
                                                    <Magnetic><a className="col_blue fs-5 hover-up transition" href={person.linkedin || "#"}><i className="fa fa-linkedin"></i></a></Magnetic>
                                                </div>
                                            </div>
                                        </div>
                                    </Reveal>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <Reveal animation="fade-up">
                                    <p className="text-muted italic fs-4">Our team members are currently hard at work. Stay tuned for updates!</p>
                                </Reveal>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
