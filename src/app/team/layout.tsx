import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Our Team | Infinity Overseas Consultants',
    description: 'Meet the expert team behind Infinity Overseas Consultants — experienced immigration advisors and education counselors.',
    alternates: { canonical: 'https://infinityconsultants.pk/team' },
    openGraph: {
        title: 'Our Team | Infinity Overseas Consultants',
        description: 'Meet our experienced immigration advisors and education counselors.',
        url: 'https://infinityconsultants.pk/team',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Team | Infinity Overseas Consultants',
        description: 'Experienced immigration advisors and education counselors.',
    },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
