'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const MouseFollower = dynamic(() => import('@/components/MouseFollower'), {
    ssr: false,
});

export default function SiteShell({ children, settings }: { children: React.ReactNode, settings: any }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    if (isAdmin) return <>{children}</>;

    return (
        <>
            <MouseFollower />
            <Header initialSettings={settings} />
            <main className="flex-grow-1">{children}</main>
            <Footer initialSettings={settings} />
        </>
    );
}
