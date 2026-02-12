"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "@/components/Particles";
import DaysCounter from "@/components/DaysCounter";
import PhotoGallery from "@/components/PhotoGallery";
import SecretButton from "@/components/SecretButton";

const letterLines = [
    "ملاك...",
    "",
    "لا أعرف من أين أبدأ، ولا أعرف إن كانت الكلمات كافية،",
    "لكنني سأحاول أن أكتب لكِ ما يعجز لساني عن قوله.",
    "",
    "قبل عامٍ واحد، دخلتِ حياتي بهدوء،",
    "لكنكِ قلبتِ كلّ شيءٍ فيها رأساً على عقب.",
    "لم تكوني مجرّد شخصٍ عابر،",
    "بل كنتِ النور الذي أضاء أيامي المظلمة.",
    "",
    "أنتِ الصديقة التي وقفت بجانبي حين ابتعد الجميع،",
    "والإنسانة التي آمنت بي حين شككتُ في نفسي.",
    "أنتِ من جعلتني أرى الحياة بعيونٍ مختلفة،",
    "ومن علّمتني أنّ الصداقة الحقيقية ليست كلاماً يُقال،",
    "بل هي فعلٌ يُعاش كلّ يوم.",
    "",
    "أشكركِ على كلّ لحظةٍ ضحكنا فيها معاً،",
    "وعلى كلّ مرةٍ مسحتِ فيها دموعي دون أن أطلب.",
    "أشكركِ على صبركِ عليّ حين كنتُ صعباً،",
    "وعلى صدقك الذي لم يتغيّر مهما تغيّرت الظروف.",
    "",
    "كلّ ذكرى جمعتنا هي كنزٌ أحمله في قلبي،",
    "وكلّ يومٍ يمرّ يزيدني يقيناً",
    "أنّ وجودكِ في حياتي هو أعظم نعمةٍ أُعطيتها.",
    "",
    "لا أريد لهذه الصداقة أن تنتهي أبداً،",
    "بل أريدها أن تكبر وتزداد جمالاً مع كلّ عام.",
    "أريدنا أن نبقى كما نحن — نضحك، نحلم، ونسند بعضنا.",
    "",
    "أعدكِ أنني سأكون دائماً هنا من أجلكِ،",
    "في الأيام الجميلة وفي الأيام الصعبة،",
    "في الفرح وفي الحزن،",
    "سأبقى صديقكِ الذي لا يتخلّى عنكِ مهما حدث.",
    "",
    "شكراً لأنكِ أنتِ، ملاك.",
    "شكراً لأنكِ جعلتِ هذا العام الأجمل في حياتي.",
    "",
    "ذكرى سنوية سعيدة يا أغلى إنسانة ❤️",
    "",
    "بكلّ حبٍّ وامتنان،",
    "صديقكِ للأبد،",
    "عماد 💛",
];

export default function LetterPage() {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [currentChar, setCurrentChar] = useState(0);
    const [typingDone, setTypingDone] = useState(false);
    const [showExtras, setShowExtras] = useState(false);

    const startTyping = useCallback(() => {
        setDisplayedLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
        setTypingDone(false);
        setShowExtras(false);
    }, []);

    useEffect(() => {
        if (typingDone) return;

        if (currentLine >= letterLines.length) {
            setTypingDone(true);
            setTimeout(() => setShowExtras(true), 800);
            return;
        }

        const line = letterLines[currentLine];

        // Empty line — skip quickly
        if (line === "") {
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, ""]);
                setCurrentLine((prev) => prev + 1);
                setCurrentChar(0);
            }, 300);
            return () => clearTimeout(timeout);
        }

        if (currentChar < line.length) {
            const timeout = setTimeout(() => {
                setCurrentChar((prev) => prev + 1);
            }, 40);
            return () => clearTimeout(timeout);
        } else {
            // Line complete
            const timeout = setTimeout(() => {
                setDisplayedLines((prev) => [...prev, line]);
                setCurrentLine((prev) => prev + 1);
                setCurrentChar(0);
            }, 200);
            return () => clearTimeout(timeout);
        }
    }, [currentLine, currentChar, typingDone]);

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-start p-6 pt-16 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <Particles />

            {/* Title */}
            <motion.h1
                className="text-3xl sm:text-4xl font-bold mb-10 text-center relative z-10"
                style={{
                    fontFamily: "var(--font-playfair)",
                    background: "linear-gradient(135deg, #FACC15, #F472B6, #7C3AED)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                رسالةٌ لكِ
            </motion.h1>

            {/* Letter Card */}
            <motion.div
                className="glass-card-accent w-full max-w-2xl px-8 py-10 sm:px-12 sm:py-14 relative z-10"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{
                    boxShadow: "0 0 60px rgba(124, 58, 237, 0.15), 0 0 120px rgba(244, 114, 182, 0.08)",
                }}
            >
                <div
                    className="text-lg sm:text-xl leading-relaxed"
                    style={{
                        fontFamily: "var(--font-playfair)",
                        color: "rgba(255, 255, 255, 0.85)",
                        textAlign: "right",
                    }}
                >
                    {displayedLines.map((line, i) => (
                        <p key={i} className={line === "" ? "h-4" : "mb-2"}>
                            {line}
                        </p>
                    ))}

                    {/* Currently typing line */}
                    {!typingDone && currentLine < letterLines.length && letterLines[currentLine] !== "" && (
                        <p className="mb-2">
                            {letterLines[currentLine].substring(0, currentChar)}
                            <span className="typing-cursor" />
                        </p>
                    )}
                </div>

                {/* Signature flourish */}
                {typingDone && (
                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div
                            className="inline-block text-4xl"
                            style={{
                                filter: "drop-shadow(0 0 15px rgba(250, 204, 21, 0.5))",
                            }}
                        >
                            💛
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Extras section - shown after typing completes */}
            {showExtras && (
                <motion.div
                    className="w-full max-w-2xl mt-8 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Days Counter */}
                    <DaysCounter startDate="2025-02-12" />

                    {/* Photo Gallery */}
                    <PhotoGallery />

                    {/* Replay Button */}
                    <div className="text-center mt-8">
                        <motion.button
                            onClick={startTyping}
                            className="glow-btn glow-btn-gold px-8 py-3 text-base"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ✨ إعادة الذكريات
                        </motion.button>
                    </div>

                    {/* Secret Button */}
                    <SecretButton />

                    {/* Footer */}
                    <div className="text-center mt-16 mb-8">
                        <p className="text-white/20 text-xs tracking-widest">
                            صُنع بكلّ ❤️ بواسطة عماد
                        </p>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
