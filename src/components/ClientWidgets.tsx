"use client";

import dynamic from 'next/dynamic';

// Dynamically import client-side widgets with SSR disabled to prevent hydration errors
const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), { ssr: false });
const TawkController = dynamic(() => import('@/components/TawkController'), { ssr: false });

/**
 * ClientWidgets component
 * This component acts as a wrapper for all floating/client-side only widgets.
 * By using next/dynamic with { ssr: false }, we ensure these components are 
 * completely bypassed during server-side rendering, which is the definitive 
 * fix for hydration mismatches (HTML tag/class mismatches) in Next.js.
 */
const ClientWidgets = () => {
    return (
        <>
            <WhatsAppButton />
            <TawkController />
        </>
    );
};

export default ClientWidgets;
