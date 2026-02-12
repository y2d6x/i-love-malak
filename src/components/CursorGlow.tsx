"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (glowRef.current) {
                glowRef.current.style.left = `${e.clientX}px`;
                glowRef.current.style.top = `${e.clientY}px`;
                glowRef.current.style.opacity = "1";
            }
        };

        const handleMouseLeave = () => {
            if (glowRef.current) {
                glowRef.current.style.opacity = "0";
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return <div ref={glowRef} className="cursor-glow hidden md:block" style={{ opacity: 0 }} />;
}
