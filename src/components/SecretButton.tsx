"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecretButton() {
    const [revealed, setRevealed] = useState(false);

    return (
        <div className="relative mt-12 flex flex-col items-center">
            <motion.button
                className="text-white/10 text-xs hover:text-white/30 transition-colors duration-500 cursor-default"
                onClick={() => setRevealed(!revealed)}
                whileHover={{ scale: 1.05 }}
                aria-label="Secret message"
            >
                ✦ ✦ ✦
            </motion.button>

            <AnimatePresence>
                {revealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 glass-card-accent px-6 py-4 text-center"
                    >
                        <p
                            className="text-lg"
                            style={{
                                fontFamily: "var(--font-playfair)",
                                background: "linear-gradient(135deg, #FACC15, #F472B6)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            أنتِ أغلى شخصٍ في هذا العالم. 💛
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
