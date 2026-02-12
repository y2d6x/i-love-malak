"use client";

import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";

export default function MusicToggle() {
    const { isPlaying, toggle } = useAudio();

    return (
        <motion.button
            onClick={toggle}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300"
            style={{
                background: isPlaying
                    ? "rgba(124, 58, 237, 0.3)"
                    : "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: isPlaying
                    ? "0 0 20px rgba(124, 58, 237, 0.3)"
                    : "none",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
            title={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
        >
            <span className="text-xl">{isPlaying ? "🎵" : "🔇"}</span>
        </motion.button>
    );
}
