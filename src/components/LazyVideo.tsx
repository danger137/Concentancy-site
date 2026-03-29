"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
    src: string;
    className?: string;
    style?: React.CSSProperties;
    poster?: string;
}

/**
 * LazyVideo — only loads and plays the video when it scrolls into view.
 * This prevents massive video files from blocking page load.
 * Uses IntersectionObserver to detect visibility, and preload="none"
 * until the video is in the viewport.
 */
export default function LazyVideo({ src, className = "", style = {}, poster }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, start loading and playing
                    video.src = src;
                    video.load();
                    video.play().catch(() => { });
                    observer.unobserve(video);
                }
            },
            { rootMargin: "200px" } // Start loading 200px before visible
        );

        observer.observe(video);
        return () => observer.disconnect();
    }, [src]);

    return (
        <video
            ref={videoRef}
            autoPlay={false}
            loop
            muted
            playsInline
            preload="none"
            poster={poster}
            className={className}
            style={style}
        />
    );
}
