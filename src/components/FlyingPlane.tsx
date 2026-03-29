"use client";

import { useEffect, useState } from "react";

const FlyingPlane = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Re-trigger animation every 12 seconds
        const interval = setInterval(() => {
            setVisible(false);
            setTimeout(() => setVisible(true), 100);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    if (!visible) return null;

    return (
        <div className="flying-plane-wrapper" aria-hidden="true">
            {/* The airplane */}
            <div className="flying-plane">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                    width="52"
                    height="52"
                    className="plane-svg"
                >
                    <path
                        d="M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z"
                        fill="#FF7700"
                    />
                </svg>
                {/* Trail / dashed path behind the plane */}
                <div className="plane-trail"></div>
            </div>
        </div>
    );
};

export default FlyingPlane;
