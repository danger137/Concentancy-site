import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Testimonials | Infinity Overseas Consultants',
    description: 'Read real success stories from students who achieved their study abroad dreams with Infinity Overseas Consultants.',
    alternates: { canonical: 'https://infinityconsultants.pk/testimonials' },
    openGraph: {
        title: 'Testimonials | Infinity Overseas Consultants',
        description: 'Real success stories from students who achieved their study abroad dreams.',
        url: 'https://infinityconsultants.pk/testimonials',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Testimonials | Infinity Overseas Consultants',
        description: 'Real success stories from students who studied abroad.',
    },
};

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
