import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Why Choose Us | Infinity Overseas Consultants',
    description: 'Discover why thousands trust Infinity Overseas Consultants — scholarship assistance, easy applications, and expert tour packages.',
    keywords: ['why choose Infinity Overseas', 'best immigration consultant', 'scholarship assistance Pakistan', '100% visa success rate'],
    alternates: { canonical: 'https://infinityconsultants.pk/why-choose-us' },
    openGraph: {
        title: 'Why Choose Us | Infinity Overseas Consultants',
        description: 'Scholarship assistance, easy applications, and 100% visa success rate.',
        url: 'https://infinityconsultants.pk/why-choose-us',
    },
};

export default function WhyChooseUsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
