import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Infinity Overseas Consultants',
    description: 'Learn about Infinity Overseas Consultants — our story, leadership, and 100% visa success rate helping thousands study abroad.',
    alternates: { canonical: 'https://infinityconsultants.pk/about' },
    openGraph: {
        title: 'About Us | Infinity Overseas Consultants',
        description: 'Learn about Infinity Overseas Consultants — our story, leadership, and 100% visa success rate helping thousands study abroad.',
        url: 'https://infinityconsultants.pk/about',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About Us | Infinity Overseas Consultants',
        description: 'Our story, leadership, and 100% visa success rate.',
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
