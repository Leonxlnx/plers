"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORDS = ["Nature's", "Life's", "Tomorrow's", "Biology's"];

export function WordRotator() {
    const currentRef = useRef<HTMLSpanElement>(null);
    const nextRef = useRef<HTMLSpanElement>(null);
    const indexRef = useRef(0);

    useEffect(() => {
        // Set initial word
        if (currentRef.current) {
            currentRef.current.textContent = WORDS[0];
        }

        const interval = setInterval(() => {
            const nextIndex = (indexRef.current + 1) % WORDS.length;

            if (nextRef.current) {
                nextRef.current.textContent = WORDS[nextIndex];
            }

            const tl = gsap.timeline();

            // Current exits upward
            tl.to(currentRef.current, {
                y: "-100%",
                opacity: 0,
                duration: 0.45,
                ease: "power3.in",
            });

            // Next enters from below
            tl.fromTo(
                nextRef.current,
                { y: "100%", opacity: 0 },
                { y: "0%", opacity: 1, duration: 0.45, ease: "power3.out" },
                "-=0.15"
            );

            // After animation, swap texts and reset
            tl.call(() => {
                indexRef.current = nextIndex;
                if (currentRef.current) {
                    currentRef.current.textContent = WORDS[nextIndex];
                    gsap.set(currentRef.current, { y: "0%", opacity: 1 });
                }
                if (nextRef.current) {
                    gsap.set(nextRef.current, { y: "100%", opacity: 0 });
                }
            });
        }, 3200);

        return () => clearInterval(interval);
    }, []);

    return (
        <span className="word-rotator">
            <span className="word-current" ref={currentRef}>
                {WORDS[0]}
            </span>
            <span className="word-next" ref={nextRef} />
        </span>
    );
}
