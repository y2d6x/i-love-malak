"use client";

import { useMemo } from "react";

interface DaysCounterProps {
    startDate?: string;
}

export default function DaysCounter({ startDate = "2025-02-12" }: DaysCounterProps) {
    const days = 365;

    return (
        <div className="text-center my-8">
            <p className="text-white/50 text-sm tracking-widest uppercase mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                أيامٌ معاً
            </p>
            <div className="inline-flex items-center gap-1" dir="ltr">
                {String(days).split("").map((digit, i) => (
                    <span
                        key={i}
                        className="inline-block w-12 h-14 leading-[3.5rem] text-3xl font-bold rounded-xl text-center"
                        style={{
                            fontFamily: "var(--font-playfair)",
                            background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(244,114,182,0.3))",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#FACC15",
                            textShadow: "0 0 20px rgba(250,204,21,0.5)",
                        }}
                    >
                        {digit}
                    </span>
                ))}
            </div>
            <p className="text-white/30 text-xs mt-2 tracking-wider">والعدّ مستمر ∞</p>
        </div>
    );
}
