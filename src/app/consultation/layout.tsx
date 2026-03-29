import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Book a Consultation | Free Immigration Advice",
    description: "Ready to start your journey? Book a free consultation with Infinity Overseas Consultants today. Get personalized advice on study visas, scholarships, and immigration paths.",
    keywords: ["Immigration Consultation", "Free Visa Advice", "Study Abroad Counseling Faisalabad", "Infinity Overseas Booking"],
    alternates: { canonical: 'https://infinityconsultants.pk/consultation' },
    openGraph: {
        title: 'Book a Free Consultation | Infinity Overseas Consultants',
        description: 'Get personalized advice on study visas, scholarships, and immigration paths.',
        url: 'https://infinityconsultants.pk/consultation',
    },
};

export default function ConsultationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
