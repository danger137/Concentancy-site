import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | Infinity Overseas Consultants',
    description: 'Read the latest study abroad tips, immigration news, and education guides from Infinity Overseas Consultants.',
    alternates: { canonical: 'https://infinityconsultants.pk/blog' },
    openGraph: {
        title: 'Blog | Infinity Overseas Consultants',
        description: 'Read the latest study abroad tips, immigration news, and education guides.',
        url: 'https://infinityconsultants.pk/blog',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blog | Infinity Overseas Consultants',
        description: 'Latest study abroad tips, immigration news, and education guides.',
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
