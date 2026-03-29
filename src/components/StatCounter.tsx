'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface StatCounterProps {
    end: number;
    duration?: number;
    delay?: number;
    suffix?: string;
    decimals?: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ end, duration = 2, delay = 0, suffix = '', decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, end, {
                duration: duration,
                delay: delay,
                ease: "easeOut",
                onUpdate: (value) => {
                    setCount(value);
                },
            });
            return () => controls.stop();
        }
    }, [isInView, end, duration, delay]);

    return (
        <span ref={ref}>
            {count.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {suffix}
        </span>
    );
};

export default StatCounter;
