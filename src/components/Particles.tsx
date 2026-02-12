"use client";

import { useEffect, useState } from "react";

interface Particle {
    id: number;
    left: number;
    top: number;
    size: number;
    delay: number;
    duration: number;
    opacity: number;
}

export default function Particles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const generated: Particle[] = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: 2 + Math.random() * 4,
            delay: Math.random() * 5,
            duration: 4 + Math.random() * 6,
            opacity: 0.2 + Math.random() * 0.5,
        }));
        setParticles(generated);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        background: `radial-gradient(circle, rgba(124,58,237,${p.opacity}), rgba(244,114,182,${p.opacity * 0.5}))`,
                        animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite`,
                        boxShadow: `0 0 ${p.size * 2}px rgba(124,58,237,${p.opacity * 0.5})`,
                    }}
                />
            ))}
        </div>
    );
}
