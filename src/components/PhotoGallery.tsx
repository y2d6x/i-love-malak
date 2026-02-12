"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const placeholderImages = [
    "/gallery/photo1.jpg",
    "/gallery/photo2.jpg",
    "/gallery/photo3.jpg",
];

export default function PhotoGallery() {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % placeholderImages.length);
    const prev = () => setCurrent((prev) => (prev - 1 + placeholderImages.length) % placeholderImages.length);

    return (
        <div className="w-full max-w-md mx-auto my-8">
            <p
                className="text-center text-white/50 text-sm tracking-widest uppercase mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
            >
                ذكرياتنا
            </p>

            <div className="relative glass-card overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Image
                            src={placeholderImages[current]}
                            alt={`ذكرى ${current + 1}`}
                            fill
                            className="object-cover rounded-3xl"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = "none";
                                if (target.parentElement) {
                                    target.parentElement.innerHTML = `
                    <div class="flex items-center justify-center w-full h-full text-white/20">
                      <div class="text-center">
                        <p class="text-4xl mb-2">📸</p>
                        <p class="text-sm">صورة ${current + 1}</p>
                        <p class="text-xs mt-1">أضف صورتك هنا</p>
                      </div>
                    </div>
                  `;
                                }
                            }}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all z-10"
                >
                    ‹
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all z-10"
                >
                    ›
                </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {placeholderImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current
                            ? "bg-primary w-6"
                            : "bg-white/20 hover:bg-white/40"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
