'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MouseFollower from '@/components/MouseFollower';
import { useEffect, useState } from 'react';

export default function SiteShell({ children, settings }: { children: React.ReactNode, settings: any }) {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAdmin = pathname?.startsWith('/admin') || pathname?.startsWith('/login');

    if (isAdmin) return <>{children}</>;

    return (
        <>
            {mounted && <MouseFollower />}
            <Header initialSettings={settings} />
            <main className="flex-grow-1">{children}</main>
            <Footer initialSettings={settings} />
        </>
    );
}
