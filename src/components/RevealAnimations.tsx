"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface RevealProps {
    children: ReactNode;
    animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in";
    delay?: number;
    className?: string;
}

export function Reveal({ children, animation = "fade-up", delay = 0, className = "" }: RevealProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const variants = {
        hidden: {
            opacity: 0,
            y: animation === "fade-up" ? 50 : animation === "fade-down" ? -50 : 0,
            x: animation === "fade-left" ? 50 : animation === "fade-right" ? -50 : 0,
            scale: animation === "scale-in" ? 0.8 : 1,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] as any,
            },
        },
    };

    // Use a simple div for initial render to ensure hydration match
    if (!mounted) {
        return (
            <div className={className}>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function RevealAnimations() {
    return null;
}
