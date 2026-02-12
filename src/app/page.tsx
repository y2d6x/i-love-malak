"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { saveYesClick, saveNoClick } from "@/lib/api";
import FloatingHearts from "@/components/FloatingHearts";

const noMessages = [
  { emoji: "😌", text: "هل أنتِ متأكدة؟ فكّري مرة أخرى..." },
  { emoji: "🥺", text: "هذه ليست الإجابة الصحيحة!" },
  { emoji: "😤", text: "حاولي مرة أخرى، حبيبتي..." },
  { emoji: "💀", text: "إجابة خاطئة، حاولي مجدداً!" },
  { emoji: "😢", text: "أنتِ تكسرين قلبي..." },
  { emoji: "🫠", text: "محاولة جميلة... لكن لا!" },
];

export default function LoveQuestion() {
  const router = useRouter();
  const { play } = useAudio();
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [noDodged, setNoDodged] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const handleYes = () => {
    setTransitioning(true);
    play();
    saveYesClick();
    setTimeout(() => router.push("/quiz"), 600);
  };

  const handleNo = useCallback(() => {
    saveNoClick();
    setNoClickCount((prev) => prev + 1);
    setShowModal(true);
    setShaking(true);
    setTimeout(() => setShaking(false), 500);

    const padding = 80;
    const btnW = 160;
    const btnH = 56;
    const vw = typeof window !== "undefined" ? window.innerWidth : 800;
    const vh = typeof window !== "undefined" ? window.innerHeight : 600;

    const randomX = padding + Math.random() * (vw - btnW - padding * 2);
    const randomY = padding + Math.random() * (vh - btnH - padding * 2);

    setNoPos({ x: randomX, y: randomY });
    setNoDodged(true);

    setTimeout(() => setShowModal(false), 2000);
  }, []);

  const currentMsg = noMessages[Math.min(noClickCount - 1, noMessages.length - 1)] || noMessages[0];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: transitioning ? 0 : 1 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingHearts />

      <motion.div
        className="glass-card px-8 py-12 sm:px-14 sm:py-16 max-w-lg w-full text-center relative z-10"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Decorative hearts */}
        <motion.div
          className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl"
          animate={{
            y: [0, -8, 0],
            filter: [
              "drop-shadow(0 0 8px rgba(244,114,182,0.4))",
              "drop-shadow(0 0 20px rgba(244,114,182,0.7))",
              "drop-shadow(0 0 8px rgba(244,114,182,0.4))",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: "var(--font-playfair)",
            background: "linear-gradient(135deg, #fff, #F9A8D4)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          هل تحبّين عماد؟
        </motion.h1>

        <motion.p
          className="text-white/40 text-sm mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          اختاري بحكمة... 💫
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <motion.button
            className="glow-btn glow-btn-primary text-lg px-12 py-4"
            onClick={handleYes}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            نعم ❤️
          </motion.button>

          {!noDodged && (
            <motion.button
              className="glow-btn glow-btn-secondary text-lg px-12 py-4"
              onClick={handleNo}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              لا 💔
            </motion.button>
          )}
        </div>
      </motion.div>

      {noDodged && (
        <motion.button
          ref={noBtnRef}
          className={`glow-btn glow-btn-secondary text-lg px-12 py-4 ${shaking ? "shake" : ""}`}
          onClick={handleNo}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: "fixed",
            zIndex: 40,
          }}
          initial={{ left: noPos.x, top: noPos.y, opacity: 0, scale: 0.5 }}
          animate={{
            left: noPos.x,
            top: noPos.y,
            opacity: 1,
            scale: 1,
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            left: { type: "spring", stiffness: 200, damping: 15 },
            top: { type: "spring", stiffness: 200, damping: 15 },
            rotate: { duration: 0.4 },
          }}
        >
          لا 💔
        </motion.button>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card-accent px-8 py-8 text-center relative z-10 max-w-sm"
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <p className="text-5xl mb-4">{currentMsg.emoji}</p>
              <p
                className="text-xl font-semibold"
                style={{
                  fontFamily: "var(--font-playfair)",
                  color: "#F9A8D4",
                }}
              >
                {currentMsg.text}
              </p>
              <p className="text-white/40 text-sm mt-3">
                الإجابة الصحيحة دائماً هي نعم 💜
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
