import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login | Infinity Overseas Consultants',
    description: 'Admin login portal for Infinity Overseas Consultants.',
    robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
