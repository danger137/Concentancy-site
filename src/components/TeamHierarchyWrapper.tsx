'use client';

import dynamic from 'next/dynamic';

const TeamHierarchyComponent = dynamic(() => import('./TeamHierarchy').then(mod => mod.default), { 
    ssr: false,
    loading: () => (
        <section className="py-5 bg-light border-top text-center" style={{ minHeight: '400px' }}>
            <div className="container-xl py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Team Hierarchy...</span>
                </div>
            </div>
        </section>
    )
});

export default function TeamHierarchyWrapper() {
    return <TeamHierarchyComponent />;
}


