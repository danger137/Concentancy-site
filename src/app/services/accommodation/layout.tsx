import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accommodation Assistance | Infinity Overseas Consultants',
    description: 'Find safe and affordable student accommodation abroad — on-campus housing, private apartments, and homestay options with full support.',
    keywords: ['student accommodation abroad', 'university housing', 'study abroad accommodation', 'student housing UK', 'student housing Canada'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/accommodation' },
    openGraph: {
        title: 'Accommodation Assistance | Infinity Overseas Consultants',
        description: 'Find safe and affordable student accommodation abroad with full support.',
        url: 'https://infinityconsultants.pk/services/accommodation',
    },
};

export default function AccommodationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
