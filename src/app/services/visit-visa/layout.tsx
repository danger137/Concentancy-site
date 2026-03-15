import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Visit Visa Services | Infinity Overseas Consultants',
    description: 'Get expert visit visa assistance — document review, interview preparation, and embassy guidance for tourist and business visas worldwide.',
    keywords: ['visit visa', 'tourist visa Pakistan', 'business visa', 'visa interview preparation', 'embassy guidance'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/visit-visa' },
    openGraph: {
        title: 'Visit Visa Services | Infinity Overseas Consultants',
        description: 'Expert document review, interview preparation, and embassy guidance for visit visas.',
        url: 'https://infinityconsultants.pk/services/visit-visa',
    },
};

export default function VisitVisaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
