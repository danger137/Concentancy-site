"use client";

import dynamic from 'next/dynamic';

const DestinationsClient = dynamic(() => import('./DestinationsClient'), {
    ssr: false, // Bypasses the Turbopack SSR HMR bug for this client-heavy page
});

export default function DestinationsWrapper() {
    return <DestinationsClient />;
}
