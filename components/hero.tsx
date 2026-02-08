"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                delay: 0.4,
            });

            // Label
            tl.fromTo(
                labelRef.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.7 }
            );

            // Headline lines
            const lines = headlineRef.current?.querySelectorAll(".line-inner");
            if (lines) {
                tl.to(lines, {
                    y: "0%",
                    duration: 1.1,
                    stagger: 0.08,
                    ease: "power3.out",
                }, "-=0.3");
            }

            // Description
            tl.fromTo(
                descRef.current,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.5"
            );

            // CTAs
            const ctas = ctaRef.current?.children;
            if (ctas) {
                tl.fromTo(
                    ctas,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
                    "-=0.3"
                );
            }

            // Scroll
            tl.fromTo(
                scrollRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 },
                "-=0.2"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={sectionRef}>
            <div className="hero-inner">
                <div className="hero-label" ref={labelRef} style={{ opacity: 0 }}>
                    Biosciences
                </div>

                <h1 className="hero-headline" ref={headlineRef}>
                    <span className="line">
                        <span className="line-inner hl-sans">Engineering</span>
                    </span>
                    <span className="line">
                        <span className="line-inner hl-serif">tomorrow&apos;s</span>
                    </span>
                    <span className="line">
                        <span className="line-inner hl-sans">
                            health<span className="hl-period">.</span>
                        </span>
                    </span>
                </h1>

                <p className="hero-desc" ref={descRef} style={{ opacity: 0 }}>
                    We merge biotechnology with artificial intelligence to develop
                    personalized therapies with the potential to transform millions
                    of lives.
                </p>

                <div className="hero-cta" ref={ctaRef}>
                    <button className="cta-primary" style={{ opacity: 0 }}>
                        <span>Explore our research</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M3 8H13M13 8L9 4M13 8L9 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button className="cta-link" style={{ opacity: 0 }}>
                        Learn more
                    </button>
                </div>
            </div>

            <div className="scroll-hint" ref={scrollRef} style={{ opacity: 0 }}>
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
