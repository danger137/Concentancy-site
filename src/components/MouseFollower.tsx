"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function MouseFollower() {
    const [mounted, setMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 300 };
    const scrollX = useSpring(mouseX, springConfig);
    const scrollY = useSpring(mouseY, springConfig);

    useEffect(() => {
        setMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("button") ||
                target.closest("a") ||
                target.getAttribute("data-magnetic")
            ) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (!mounted) return null;

    return (
        <motion.div
            className="mouse-follower"
            style={{
                left: scrollX,
                top: scrollY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            animate={{
                scale: isHovered ? 1.8 : 1,
                backgroundColor: isHovered ? "rgba(255, 119, 0, 0.4)" : "rgba(7, 41, 77, 0.3)",
            }}
        />
    );
}
