import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Study Abroad Services | Infinity Overseas Consultants',
    description: 'Expert study abroad guidance — university selection, admission support, visa filing, and scholarship assistance for UK, USA, Canada, and Europe.',
    keywords: ['study abroad', 'university admission', 'student visa', 'study in UK', 'study in Canada', 'Faisalabad education consultant'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/study-abroad' },
    openGraph: {
        title: 'Study Abroad Services | Infinity Overseas Consultants',
        description: 'Expert university selection, admission support, and visa filing for studying abroad.',
        url: 'https://infinityconsultants.pk/services/study-abroad',
    },
};

export default function StudyAbroadLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
