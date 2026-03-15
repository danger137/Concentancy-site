import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Immigration Services | Infinity Overseas Consultants',
    description: 'Professional immigration services — PR eligibility assessment, professional filing, and settlement support for Canada, Australia, and UK.',
    keywords: ['immigration services', 'permanent residency', 'PR visa Pakistan', 'Canada immigration', 'Australia PR', 'UK settlement'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/immigration' },
    openGraph: {
        title: 'Immigration Services | Infinity Overseas Consultants',
        description: 'PR eligibility assessment, professional filing, and settlement support.',
        url: 'https://infinityconsultants.pk/services/immigration',
    },
};

export default function ImmigrationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
