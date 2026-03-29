'use client';

import React from 'react';
import LazyVideo from '@/components/LazyVideo';

export default function PlaneTakeoffVideo() {
    return (
        <div className="position-relative overflow-hidden rounded-4 shadow-lg w-100" style={{ height: '550px' }}>
            <LazyVideo
                src="/plane_mission.mp4"
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(transparent, rgba(7, 41, 77, 0.9))' }}>
                <h3 className="text-white fw-bold mb-1">Take Your <span className="col_oran">First Step</span></h3>
                <p className="text-light-50 mb-0 small">Soar to new heights with global education.</p>
            </div>
            <div className="position-absolute top-50 start-50 translate-middle">
                <span className="btn-play bg-white rounded-circle shadow d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', color: '#FF7700', opacity: 0.9 }}>
                    <i className="fa fa-plane fs-3" style={{ transform: 'rotate(-45deg)' }}></i>
                </span>
            </div>
        </div>
    );
}
