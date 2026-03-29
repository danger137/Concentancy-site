import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://infinityconsultants.pk";

    // Fetch dynamic content
    let blogPosts: any[] = [];
    try {
        blogPosts = await prisma.blog.findMany({
            select: { id: true, updatedAt: true },
        });
    } catch (e) {
        console.error("Error fetching blogs for sitemap:", e);
    }

    const staticPages: { url: string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" }[] = [
        // Core pages
        { url: "", priority: 1.0, changeFrequency: "daily" },
        { url: "/about", priority: 0.8, changeFrequency: "monthly" },
        { url: "/why-choose-us", priority: 0.8, changeFrequency: "monthly" },
        { url: "/how-we-work", priority: 0.8, changeFrequency: "monthly" },
        { url: "/our-vision", priority: 0.7, changeFrequency: "monthly" },
        { url: "/our-mission", priority: 0.7, changeFrequency: "monthly" },

        // Services
        { url: "/services", priority: 0.9, changeFrequency: "weekly" },
        { url: "/services/study-abroad", priority: 0.9, changeFrequency: "weekly" },
        { url: "/services/visit-visa", priority: 0.9, changeFrequency: "weekly" },
        { url: "/services/immigration", priority: 0.9, changeFrequency: "weekly" },
        { url: "/services/language-courses", priority: 0.9, changeFrequency: "weekly" },
        { url: "/services/accommodation", priority: 0.8, changeFrequency: "weekly" },

        // Destinations
        { url: "/destinations/asian-countries", priority: 0.9, changeFrequency: "weekly" },
        { url: "/destinations/european-countries", priority: 0.9, changeFrequency: "weekly" },
        { url: "/destinations/schengen", priority: 0.9, changeFrequency: "weekly" },

        // Immigration sub-pages
        { url: "/services/immigration/uk", priority: 0.8, changeFrequency: "weekly" },
        { url: "/services/immigration/canada", priority: 0.8, changeFrequency: "weekly" },
        { url: "/services/immigration/australia", priority: 0.8, changeFrequency: "weekly" },

        // Information
        { url: "/testimonials", priority: 0.7, changeFrequency: "weekly" },
        { url: "/blog", priority: 0.8, changeFrequency: "daily" },
        { url: "/event", priority: 0.7, changeFrequency: "weekly" },
        { url: "/assessment", priority: 0.7, changeFrequency: "monthly" },

        // Contact & Consultation
        { url: "/contact", priority: 0.8, changeFrequency: "monthly" },
        { url: "/consultation", priority: 0.9, changeFrequency: "monthly" },
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [
        ...staticPages.map((page) => ({
            url: `${baseUrl}${page.url}`,
            lastModified: new Date(),
            changeFrequency: page.changeFrequency,
            priority: page.priority,
        })),
        ...blogPosts.map((blog) => ({
            url: `${baseUrl}/blog/detail?id=${blog.id}`,
            lastModified: blog.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
    ];

    return sitemapEntries;
}
