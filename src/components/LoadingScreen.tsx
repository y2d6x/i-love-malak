"use client";

import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0F172A]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.div
                className="text-6xl heart-pulse"
                animate={{
                    scale: [1, 1.3, 1],
                    filter: [
                        "drop-shadow(0 0 10px rgba(244,114,182,0.4))",
                        "drop-shadow(0 0 30px rgba(244,114,182,0.8))",
                        "drop-shadow(0 0 10px rgba(244,114,182,0.4))",
                    ],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
                ❤️
            </motion.div>
            <motion.p
                className="mt-6 text-lg tracking-widest text-white/60"
                style={{ fontFamily: "var(--font-poppins)" }}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                يُحمّل بحبّ...
            </motion.p>
        </motion.div>
    );
}
