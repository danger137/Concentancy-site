import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Infinity Overseas Consultants',
    description: 'Get in touch with Infinity Overseas Consultants for expert immigration and study abroad guidance. Call, email, or visit us in Faisalabad.',
    keywords: ['contact Infinity Overseas', 'immigration consultant Faisalabad', 'study abroad contact', 'visa help Faisalabad'],
    alternates: { canonical: 'https://infinityconsultants.pk/contact' },
    openGraph: {
        title: 'Contact Us | Infinity Overseas Consultants',
        description: 'Get in touch with Infinity Overseas Consultants for expert immigration and study abroad guidance.',
        url: 'https://infinityconsultants.pk/contact',
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
