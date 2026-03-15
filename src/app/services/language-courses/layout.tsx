import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Language Courses | IELTS & PTE Preparation | Infinity Overseas Consultants',
    description: 'Comprehensive IELTS, PTE, and language course preparation with expert coaching, mock tests, and personalized study plans in Faisalabad.',
    keywords: ['IELTS preparation Faisalabad', 'PTE coaching', 'language courses', 'English test preparation', 'IELTS mock test'],
    alternates: { canonical: 'https://infinityconsultants.pk/services/language-courses' },
    openGraph: {
        title: 'Language Courses | IELTS & PTE Preparation',
        description: 'Comprehensive IELTS, PTE, and language course preparation with expert coaching.',
        url: 'https://infinityconsultants.pk/services/language-courses',
    },
};

export default function LanguageCoursesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
