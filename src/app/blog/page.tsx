import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import { Reveal } from '@/components/RevealAnimations';
import Magnetic from '@/components/Magnetic';
import "../../styles/blog.css";

export const metadata: Metadata = {
    title: "Latest Blogs & Immigration Updates | Infinity Overseas",
    description: "Stay updated with the latest news, blogs, and immigration updates from Infinity Overseas Consultants. Expert insights on study abroad, visas, and global career opportunities.",
    keywords: ["Immigration Blog", "Study Abroad Updates", "Visa News Pakistan", "Infinity Overseas Articles"],
};

export const revalidate = 600; // Revalidate every 10 minutes

interface BlogType {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
}

interface BlogProps {
    searchParams: Promise<{ q?: string; cat?: string }>;
}

export default async function Blog({ searchParams }: BlogProps) {
    const { q = "", cat = "" } = await searchParams;
    const initialQuery = q || cat || "";

    const blogs = await prisma.blog.findMany({
        where: initialQuery ? {
            OR: [
                { title: { contains: initialQuery, mode: 'insensitive' } },
                { category: { contains: initialQuery, mode: 'insensitive' } },
                { description: { contains: initialQuery, mode: 'insensitive' } },
            ],
        } : {},
        orderBy: { createdAt: 'desc' },
    });

    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12 mb-4 d-flex flex-column">
                                <Reveal animation="fade-down">
                                <h1 className="text-white h-100 w-100">Our Insights & Updates</h1>
                                <h4 className="col_oran mb-0 fw-bold">
                                    <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span> Blogs
                                </h4>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            <section id="blog" className="p_5">
                                <div className="container-xl d-flex flex-column">
                    <div className="blog_1 row g-4">
                        <div className="col-md-8">
                            <div className="blog_1l">
                                {blogs.length > 0 ? (
                                    (blogs as BlogType[]).map((blog: BlogType, index: number) => (
                                        <Reveal key={blog.id} animation="fade-up" delay={(index % 3) * 0.1}>
                                            <div className="blog_1l1 border rounded-4 overflow-hidden mb-5 bg-white shadow-sm hover-lift transition">
                                                <div className="grid clearfix position-relative overflow-hidden" style={{ height: '400px' }}>
                                                    <Link href={`/blog/detail?id=${blog.id}`} className="d-block w-100 h-100">
                                                        <Image
                                                            src={blog.image}
                                                            alt={blog.title}
                                                            fill
                                                            className="hover-zoom transition"
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </Link>
                                                    <div className="position-absolute top-0 start-0 m-4">
                                                        <span className="badge bg_oran text-white px-3 py-2 rounded-pill fw-bold shadow-sm">{blog.category}</span>
                                                    </div>
                                                </div>
                                                <div className="p-5">
                                                    <div className="d-flex align-items-center mb-3 text-muted small">
                                                        <span className="me-3"><i className="fa fa-calendar col_oran me-2"></i>{new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                                        <span><i className="fa fa-user col_oran me-2"></i>Admin</span>
                                                    </div>
                                                    <h2 className="fw-bold mb-3">
                                                        <Link href={`/blog/detail?id=${blog.id}`} className="text-black text-decoration-none hover-text-orange transition">
                                                            {blog.title}
                                                        </Link>
                                                    </h2>
                                                    <p className="text-muted lh-lg mb-4">{blog.description}</p>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <Magnetic>
                                                            <Link className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold transition" href={`/blog/detail?id=${blog.id}`}>
                                                                Read Full Story <i className="fa fa-arrow-right ms-2 small"></i>
                                                            </Link>
                                                        </Magnetic>
                                                    </div>
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))
                                ) : (
                                    <Reveal animation="scale-in">
                                        <div className="text-center p-5 border rounded-4 bg-light shadow-inner">
                                            <i className="fa fa-search fa-3x col_oran mb-4 opacity-25"></i>
                                            <h3 className="fw-bold">No results found</h3>
                                            <p className="text-muted mb-4">We couldn't find any blogs matching your search "{initialQuery}"</p>
                                            <Link href="/blog" className="btn bg_blue text-white rounded-pill px-5 py-3 fw-bold shadow-sm hover-up">
                                                Clear Search & Show All
                                            </Link>
                                        </div>
                                    </Reveal>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <aside className="blog_1r sticky-top" style={{ top: '100px', zIndex: 1 }}>
                                <Reveal animation="fade-left">
                                    <div className="blog_1r1 border rounded-4 p-5 shadow-sm bg-white mb-4">
                                        <h4 className="fw-bold mb-4">Search Articles</h4>
                                        <form action="/blog" method="GET">
                                            <div className="input-group bg-light rounded-pill p-1 border">
                                                <input
                                                    name="q"
                                                    type="text"
                                                    className="form-control border-0 bg-transparent shadow-none ps-4 py-3"
                                                    placeholder="Keywords..."
                                                    defaultValue={initialQuery}
                                                />
                                                <Magnetic>
                                                    <button
                                                        className="btn bg_oran text-white rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm"
                                                        style={{ width: '50px', height: '50px' }}
                                                        type="submit"
                                                        aria-label="Search"
                                                    >
                                                        <i className="fa fa-search"></i>
                                                    </button>
                                                </Magnetic>
                                            </div>
                                        </form>
                                        {initialQuery && (
                                            <div className="mt-3 small text-muted text-center italic">
                                                Filtering for: "{initialQuery}"
                                            </div>
                                        )}
                                    </div>
                                </Reveal>

                                <Reveal animation="fade-left" delay={0.1}>
                                    <div className="p-5 border rounded-4 bg_blue text-white shadow-lg text-center">
                                        <div className="mb-4">
                                            <i className="fa fa-graduation-cap display-4 text-warning opacity-75"></i>
                                        </div>
                                        <h4 className="fw-bold mb-3">Free Assessment</h4>
                                        <p className="small opacity-75 mb-4">Unsure about your eligibility? Get a free profile evaluation today.</p>
                                        <Magnetic>
                                            <Link href="/consultation" className="btn btn-light text-primary w-100 py-3 rounded-pill fw-bold hover-up transition shadow-sm">
                                                Apply Now
                                            </Link>
                                        </Magnetic>
                                    </div>
                                </Reveal>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
