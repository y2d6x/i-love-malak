"use client";

import { useEffect, useState } from "react";

interface Heart {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
}

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        const generated: Heart[] = Array.from({ length: 15 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 8,
            duration: 6 + Math.random() * 6,
            size: 0.8 + Math.random() * 1.2,
        }));
        setHearts(generated);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {hearts.map((heart) => (
                <span
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.left}%`,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                        fontSize: `${heart.size}rem`,
                    }}
                >
                    ♥
                </span>
            ))}
        </div>
    );
}
