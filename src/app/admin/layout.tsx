import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Dashboard | Infinity Overseas',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // This layout intentionally does NOT include the site Header or Footer
    // so the admin dashboard has its own full-screen layout.
    return <>{children}</>;
}
