"use client";

import { useEffect, useState } from "react";

interface Sparkle {
    id: number;
    left: number;
    top: number;
    delay: number;
    size: number;
}

export default function Sparkles() {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);

    useEffect(() => {
        const generated: Sparkle[] = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 4,
            size: 2 + Math.random() * 4,
        }));
        setSparkles(generated);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {sparkles.map((s) => (
                <div
                    key={s.id}
                    className="sparkle"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
