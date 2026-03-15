import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import "../../../styles/blog.css";

interface Blog {
    id: string;
    title: string;
    description: string;
    content: string | null;
    image: string;
    category: string;
    date: string;
}

async function getBlog(id: string): Promise<Blog | null> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://infinityconsultants.pk';
    try {
        const res = await fetch(`${baseUrl}/api/blogs?id=${id}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching blog on server:", error);
        return null;
    }
}

async function getRecentPosts(currentId: string) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://infinityconsultants.pk';
    try {
        const res = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        if (Array.isArray(data)) {
            return data.filter((post: any) => post.id !== currentId).slice(0, 3);
        }
        return [];
    } catch (e) {
        return [];
    }
}

export async function generateMetadata({ searchParams }: { searchParams: { id?: string } }): Promise<Metadata> {
    const id = searchParams.id;
    if (!id) return { title: 'Blog | Infinity Overseas' };

    const blog = await getBlog(id);
    if (!blog) return { title: 'Blog Post Not Found | Infinity Overseas' };

    return {
        title: `${blog.title} | Infinity Overseas Blog`,
        description: blog.description.substring(0, 160),
        openGraph: {
            title: blog.title,
            description: blog.description.substring(0, 160),
            images: [{ url: blog.image }],
            type: 'article',
            publishedTime: blog.date,
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description: blog.description.substring(0, 160),
            images: [blog.image],
        }
    };
}

export default async function BlogDetail({ searchParams }: { searchParams: { id?: string } }) {
    const id = searchParams.id;
    if (!id) return notFound();

    const blog = await getBlog(id);
    if (!blog) return notFound();

    const recentPosts = await getRecentPosts(id);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=https://infinityconsultants.pk/blog/detail?id=${id}`,
        twitter: `https://twitter.com/intent/tweet?url=https://infinityconsultants.pk/blog/detail?id=${id}&text=${encodeURIComponent(blog.title)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=https://infinityconsultants.pk/blog/detail?id=${id}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(blog.title + ' https://infinityconsultants.pk/blog/detail?id=' + id)}`,
    };

    return (
        <>
            <section id="center" className="center_o p_3 bg_blue">
                <div className="container-xl">
                    <div className="row center_o1">
                        <div className="col-md-12">
                            <h1 className="text-white">Blog Details</h1>
                            <h4 className="col_oran mb-0 fw-bold">
                                <Link className="text-white" href="/">Home</Link> <span className="mx-2 text-muted">/</span>
                                <Link className="text-white" href="/blog">Blogs</Link> <span className="mx-2 text-muted">/</span> Details
                            </h4>
                        </div>
                    </div>
                </div>
            </section>

            <section id="blog" className="p_3">
                <div className="container-xl">
                    <div className="blog_1 row">
                        <div className="col-md-8">
                            <article className="blog_1dt">
                                <div className="blog_1dt1">
                                    <div className="grid clearfix">
                                        <figure className="effect-jazz mb-0">
                                            <img src={blog.image} className="w-100 rounded-3 shadow-sm" alt={blog.title} />
                                        </figure>
                                    </div>
                                    <ul className="font_14 mt-3 p-0" style={{ listStyle: 'none' }}>
                                        <li className="d-inline-block me-3"><span><i className="fa fa-user me-1 col_oran"></i> Admin</span></li>
                                        <li className="d-inline-block mx-2"><span><i className="fa fa-calendar me-1 col_oran"></i> {blog.date}</span></li>
                                    </ul>
                                    <h2 className="mt-3 mb-3 fw-bold">{blog.title}</h2>
                                    {(() => {
                                        const rawHtml = blog.content || blog.description;
                                        const sanitized = rawHtml
                                            .replace(/<script[\s\S]*?<\/script>/gi, '')
                                            .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
                                            .replace(/<object[\s\S]*?<\/object>/gi, '')
                                            .replace(/<embed[\s\S]*?>/gi, '')
                                            .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
                                            .replace(/on\w+\s*=\s*'[^']*'/gi, '');
                                        return <div className="blog-full-content" dangerouslySetInnerHTML={{ __html: sanitized }} />;
                                    })()}

                                    <div className="blog_1dt1i row mt-4">
                                        <div className="col-md-6 mb-2">
                                            <h6 className="mt-2"><span className="fw-bold me-3">Category:</span>
                                                <Link href={`/blog?cat=${encodeURIComponent(blog.category)}`} className="badge bg_oran text-white border-0 me-1 underline-0">{blog.category}</Link>
                                            </h6>
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <h6><span className="fw-bold me-3">Share:</span>
                                                <a className="d-inline-block bg-light rounded-circle col_oran text-center mx-1 shadow-sm" style={{ width: '35px', height: '35px', lineHeight: '35px' }} href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a>
                                                <a className="d-inline-block bg-light rounded-circle col_oran text-center mx-1 shadow-sm" style={{ width: '35px', height: '35px', lineHeight: '35px' }} href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a>
                                                <a className="d-inline-block bg-light rounded-circle col_oran text-center mx-1 shadow-sm" style={{ width: '35px', height: '35px', lineHeight: '35px' }} href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a>
                                                <a className="d-inline-block bg-light rounded-circle col_oran text-center mx-1 shadow-sm" style={{ width: '35px', height: '35px', lineHeight: '35px' }} href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer"><i className="fa fa-whatsapp"></i></a>
                                            </h6>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            </article>
                        </div>

                        <div className="col-md-4">
                            <aside className="blog_1r">
                                <div className="blog_1r1 border_1 rounded-3 p-3 shadow_box position-sticky" style={{ top: '100px' }}>
                                    <h4>Search</h4>
                                    <hr className="line mb-4" />
                                    <div className="input-group px-1 pt-2 pb-2 border_1 bg-white rounded-3 mb-4">
                                        <form action="/blog" className="d-flex w-100">
                                            <input
                                                name="q"
                                                type="text"
                                                className="form-control border-0 bg-transparent shadow-none"
                                                placeholder="Search blogs..."
                                            />
                                            <button className="btn btn-primary bg-transparent border-0 col_oran fw-bold rounded-0" type="submit">
                                                <i className="fa fa-search"></i>
                                            </button>
                                        </form>
                                    </div>

                                    <h4>Recent Posts</h4>
                                    <hr className="line mb-4" />
                                    {recentPosts.map((post, i) => (
                                        <div key={post.id}>
                                            <div className="blog_1r1i row align-items-center">
                                                <div className="col-md-3 col-3 pe-0">
                                                    <div className="grid clearfix">
                                                        <figure className="effect-jazz mb-0">
                                                            <Link href={`/blog/detail?id=${post.id}`}><img src={post.image} className="w-100 rounded" alt="" /></Link>
                                                        </figure>
                                                    </div>
                                                </div>
                                                <div className="col-md-9 col-9">
                                                    <h6 className="fw-bold mb-1" style={{ fontSize: '13px' }}>
                                                        <Link href={`/blog/detail?id=${post.id}`}>{post.title}</Link>
                                                    </h6>
                                                    <h6 className="mb-0 font_12 text-muted"><i className="fa fa-calendar col_oran me-1"></i> {post.date}</h6>
                                                </div>
                                            </div>
                                            {i < recentPosts.length - 1 && <hr />}
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

