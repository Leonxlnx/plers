"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = ["Nature's", "Life's", "Tomorrow's", "Biology's"];

export function WordRotator() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentRef = useRef<HTMLSpanElement>(null);
    const nextRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % WORDS.length;

            // Set next word
            if (nextRef.current) {
                nextRef.current.textContent = WORDS[nextIndex];
            }

            const tl = gsap.timeline({
                onComplete: () => {
                    setCurrentIndex(nextIndex);
                    // Reset positions
                    if (currentRef.current) {
                        gsap.set(currentRef.current, { y: "0%", opacity: 1 });
                    }
                    if (nextRef.current) {
                        gsap.set(nextRef.current, { y: "110%", opacity: 0 });
                    }
                },
            });

            // Current word slides up and fades
            tl.to(currentRef.current, {
                y: "-110%",
                opacity: 0,
                duration: 0.5,
                ease: "power3.in",
            });

            // Next word slides in from below
            tl.fromTo(
                nextRef.current,
                { y: "110%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.5, ease: "power3.out" },
                "-=0.2"
            );
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <span className="word-rotator" ref={containerRef}>
            <span className="word-current" ref={currentRef}>
                {WORDS[currentIndex]}
            </span>
            <span className="word-next" ref={nextRef}>
                {WORDS[(currentIndex + 1) % WORDS.length]}
            </span>
        </span>
    );
}
