import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'How We Work | Infinity Overseas Consultants',
    description: 'Discover our structured 4-step process — from personalized consultation to pre-departure support for your study abroad journey.',
    keywords: ['how we work', 'study abroad process', 'visa application steps', 'immigration consultancy process'],
    alternates: { canonical: 'https://infinityconsultants.pk/how-we-work' },
    openGraph: {
        title: 'How We Work | Infinity Overseas Consultants',
        description: 'Our structured 4-step process: consultation, application, visa, and pre-departure support.',
        url: 'https://infinityconsultants.pk/how-we-work',
    },
};

export default function HowWeWorkLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
