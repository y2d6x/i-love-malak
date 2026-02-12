"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import FloatingHearts from "@/components/FloatingHearts";
import { saveQuizAnswers } from "@/lib/api";

const questions = [
    {
        category: "عن عماد",
        question: "ما الذي يجعل عماد يبتسم فوراً؟",
        emoji: "😊",
    },
    {
        category: "عن عماد",
        question: "ما هو أكبر حلم لعماد؟",
        emoji: "✨",
    },
    {
        category: "عن عماد",
        question: "ما هو الشيء المفضل لدى عماد فيكِ؟",
        emoji: "💜",
    },
    {
        category: "عن علاقتكما",
        question: "أين بدأت قصّتكما؟",
        emoji: "📍",
    },
    {
        category: "عن علاقتكما",
        question: "ما هي ذكراكما المفضّلة معاً؟",
        emoji: "🌟",
    },
    {
        category: "عن علاقتكما",
        question: "ما هو الشيء الذي لا يفهمه أحد سواكما؟",
        emoji: "🤫",
    },
    {
        category: "عنكِ",
        question: "ما هو الشيء الذي فعلتِه وجعل عماد فخوراً؟",
        emoji: "🥹",
    },
];

export default function QuizPage() {
    const router = useRouter();
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));
    const [direction, setDirection] = useState(1);
    const [completed, setCompleted] = useState(false);

    const handleAnswer = useCallback(
        (value: string) => {
            const updated = [...answers];
            updated[currentQ] = value;
            setAnswers(updated);
        },
        [answers, currentQ]
    );

    const handleNext = useCallback(() => {
        if (currentQ < questions.length - 1) {
            setDirection(1);
            setCurrentQ((prev) => prev + 1);
        } else {
            // Quiz complete
            setCompleted(true);
            saveQuizAnswers(answers); // fire-and-forget

            // Fire confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: ["#7C3AED", "#F472B6", "#FACC15"],
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: ["#7C3AED", "#F472B6", "#FACC15"],
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };
            frame();

            setTimeout(() => router.push("/letter"), 3500);
        }
    }, [currentQ, router, answers]);

    const handlePrev = useCallback(() => {
        if (currentQ > 0) {
            setDirection(-1);
            setCurrentQ((prev) => prev - 1);
        }
    }, [currentQ]);

    const progress = ((currentQ + 1) / questions.length) * 100;

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? -300 : 300,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center p-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <FloatingHearts />

            {/* Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-30 p-4">
                <div className="max-w-lg mx-auto">
                    <div className="flex justify-between items-center mb-2">
                        <span
                            className="text-white/40 text-xs tracking-widest uppercase"
                            style={{ fontFamily: "var(--font-poppins)" }}
                        >
                            السؤال {currentQ + 1} من {questions.length}
                        </span>
                        <span className="text-white/40 text-xs">
                            {questions[currentQ].category}
                        </span>
                    </div>
                    <div className="progress-bar-container">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div className="w-full max-w-lg relative z-10 mt-16">
                <AnimatePresence mode="wait" custom={direction}>
                    {!completed && (
                        <motion.div
                            key={currentQ}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="glass-card px-8 py-10 sm:px-12 sm:py-14"
                        >
                            <div className="text-center mb-8">
                                <span className="text-4xl mb-3 block">
                                    {questions[currentQ].emoji}
                                </span>
                                <h2
                                    className="text-2xl sm:text-3xl font-bold"
                                    style={{
                                        fontFamily: "var(--font-playfair)",
                                        background: "linear-gradient(135deg, #fff, #F9A8D4)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}
                                >
                                    {questions[currentQ].question}
                                </h2>
                            </div>

                            <textarea
                                value={answers[currentQ]}
                                onChange={(e) => handleAnswer(e.target.value)}
                                placeholder="اكتبي إجابتكِ هنا..."
                                rows={4}
                                className="w-full rounded-2xl px-5 py-4 text-white text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                                style={{
                                    fontFamily: "var(--font-poppins)",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    textAlign: "right",
                                }}
                            />

                            <div className="flex justify-between items-center mt-8">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentQ === 0}
                                    className="text-white/40 hover:text-white/70 transition-colors disabled:opacity-20 disabled:cursor-not-allowed px-4 py-2"
                                    style={{ fontFamily: "var(--font-poppins)" }}
                                >
                                    → رجوع
                                </button>

                                <motion.button
                                    onClick={handleNext}
                                    className="glow-btn glow-btn-primary px-8 py-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!answers[currentQ].trim()}
                                    style={{
                                        opacity: answers[currentQ].trim() ? 1 : 0.4,
                                    }}
                                >
                                    {currentQ === questions.length - 1 ? "إنهاء ✨" : "← التالي"}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Completion message */}
                <AnimatePresence>
                    {completed && (
                        <motion.div
                            className="glass-card-accent px-8 py-14 text-center"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <p className="text-5xl mb-4">🎉</p>
                            <h2
                                className="text-3xl font-bold mb-3"
                                style={{
                                    fontFamily: "var(--font-playfair)",
                                    color: "#FACC15",
                                    textShadow: "0 0 20px rgba(250,204,21,0.4)",
                                }}
                            >
                                رائع!
                            </h2>
                            <p className="text-white/50" style={{ fontFamily: "var(--font-poppins)" }}>
                                إجاباتكِ أسعدت عماد كثيراً...
                            </p>
                            <p className="text-white/30 text-sm mt-4">نُحضّر لكِ شيئاً مميزاً ✨</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
