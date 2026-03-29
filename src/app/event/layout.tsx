import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Events | Infinity Overseas Consultants',
    description: 'Discover upcoming education fairs, seminars, and study abroad events organized by Infinity Overseas Consultants.',
    keywords: ['education events Faisalabad', 'study abroad fair', 'immigration seminar', 'Infinity Overseas events'],
    alternates: { canonical: 'https://infinityconsultants.pk/event' },
    openGraph: {
        title: 'Events | Infinity Overseas Consultants',
        description: 'Discover upcoming education fairs, seminars, and study abroad events.',
        url: 'https://infinityconsultants.pk/event',
    },
};

export default function EventLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
