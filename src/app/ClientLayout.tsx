"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { AudioProvider } from "@/context/AudioContext";
import LoadingScreen from "@/components/LoadingScreen";
import CursorGlow from "@/components/CursorGlow";
import Sparkles from "@/components/Sparkles";
import MusicToggle from "@/components/MusicToggle";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);

        // Detect mobile / touch devices
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    return (
        <AudioProvider>
            <div className="animated-bg" />
            {!isMobile && <CursorGlow />}
            <Sparkles />
            <MusicToggle />

            <AnimatePresence mode="wait">
                {loading ? (
                    <LoadingScreen key="loading" />
                ) : (
                    <main key="main">
                        {children}
                    </main>
                )}
            </AnimatePresence>
        </AudioProvider>
    );
}

