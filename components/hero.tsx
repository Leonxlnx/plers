"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ParticleField } from "./particle-field";
import { DataStream } from "./data-stream";

const DNA_SEQUENCE =
    "ATCGATCG TTAGCCAA GCTTAAGG CCGGAATT ATCGATCG TTAGCCAA GCTTAAGG CCGGAATT ATCGATCG TTAGCCAA GCTTAAGG CCGGAATT ATCGATCG TTAGCCAA GCTTAAGG CCGGAATT ";

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const blobRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const annotationsRef = useRef<HTMLDivElement[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power4.out" },
                delay: 0.5,
            });

            // 1. Headline lines reveal (the star moment)
            const lineInners = headlineRef.current?.querySelectorAll(".line-inner");
            if (lineInners) {
                tl.to(lineInners, {
                    y: "0%",
                    duration: 1.4,
                    stagger: 0.12,
                    ease: "power4.out",
                });
            }

            // 2. Label slides in
            tl.fromTo(
                labelRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.8 },
                "-=0.8"
            );

            // 3. Body text
            tl.fromTo(
                bodyRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7 },
                "-=0.4"
            );

            // 4. CTA buttons
            const ctaChildren = ctaRef.current?.children;
            if (ctaChildren) {
                tl.fromTo(
                    ctaChildren,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
                    "-=0.3"
                );
            }

            // 5. Blob scales in with organic ease
            tl.fromTo(
                blobRef.current,
                { opacity: 0, scale: 0.6 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)",
                },
                "-=1.2"
            );

            // 6. Rotating badge
            tl.fromTo(
                badgeRef.current,
                { opacity: 0, scale: 0.5, rotation: -90 },
                { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "power3.out" },
                "-=1.0"
            );

            // 7. Lab annotations stagger in
            if (annotationsRef.current.length) {
                tl.fromTo(
                    annotationsRef.current,
                    { opacity: 0 },
                    { opacity: 0.5, duration: 0.6, stagger: 0.15 },
                    "-=0.8"
                );
            }

            // 8. DNA ticker
            tl.fromTo(
                tickerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8 },
                "-=0.4"
            );

            // 9. Scroll hint
            tl.fromTo(
                scrollRef.current,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.5 },
                "-=0.3"
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const addAnnotationRef = (el: HTMLDivElement | null) => {
        if (el && !annotationsRef.current.includes(el)) {
            annotationsRef.current.push(el);
        }
    };

    return (
        <section className="hero" ref={heroRef}>
            {/* === BACKGROUND LAYERS === */}
            <div className="hero-ambient" aria-hidden="true" />
            <div className="hero-dots" aria-hidden="true" />
            <ParticleField />
            <div className="hero-scanline" aria-hidden="true" />
            <div className="hero-pulse-line" aria-hidden="true" />

            {/* === DNA TICKER === */}
            <div className="dna-ticker" ref={tickerRef} style={{ opacity: 0 }} aria-hidden="true">
                <div className="dna-ticker-inner">
                    {DNA_SEQUENCE.repeat(4)}
                </div>
            </div>

            {/* === DATA STREAM (right edge) === */}
            <DataStream />

            {/* === MAIN LAYOUT === */}
            <div className="hero-layout">
                {/* LEFT: Typography & Content */}
                <div className="hero-text">
                    <div
                        className="hero-label"
                        ref={labelRef}
                        style={{ opacity: 0 }}
                    >
                        Biosciences — Zürich, CH — Est. 2019
                    </div>

                    <h1 className="hero-headline" ref={headlineRef}>
                        <span className="line">
                            <span className="line-inner headline-outline">Engineering</span>
                        </span>
                        <span className="line">
                            <span className="line-inner headline-light">tomorrow&apos;s</span>
                        </span>
                        <span className="line">
                            <span className="line-inner headline-accent">
                                health<span className="period">.</span>
                            </span>
                        </span>
                    </h1>

                    <p className="hero-body" ref={bodyRef} style={{ opacity: 0 }}>
                        We merge biotechnology with artificial intelligence to develop
                        personalized therapies with the potential to transform millions
                        of lives worldwide.
                    </p>

                    <div className="hero-cta" ref={ctaRef}>
                        <button className="cta-primary">
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
                        <button className="cta-secondary">
                            Read the science
                        </button>
                    </div>
                </div>

                {/* RIGHT: Visual elements */}
                <div className="hero-visual">
                    <div className="blob-container" ref={blobRef} style={{ opacity: 0 }}>
                        <div className="morphing-blob">
                            <div className="blob-nucleus" />
                        </div>
                    </div>

                    {/* Rotating text badge */}
                    <div className="rotating-badge" ref={badgeRef} style={{ opacity: 0 }}>
                        <div className="badge-center-dot" />
                        <svg viewBox="0 0 200 200">
                            <defs>
                                <path
                                    id="circlePath"
                                    d="M 100 100 m -72 0 a 72 72 0 1 1 144 0 a 72 72 0 1 1 -144 0"
                                />
                            </defs>
                            <text>
                                <textPath href="#circlePath" textLength="450">
                                    PLERS BIOSCIENCES • ENGINEERING TOMORROW&apos;S HEALTH • EST 2019 •
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>
            </div>

            {/* === LAB ANNOTATIONS === */}
            <div
                className="lab-annotation top-right"
                ref={addAnnotationRef}
                style={{ opacity: 0 }}
            >
                <span className="label-key">loc</span> 47.3769°N, 8.5417°E
                <br />
                <span className="label-key">status</span> active
            </div>

            <div
                className="lab-annotation bottom-left"
                ref={addAnnotationRef}
                style={{ opacity: 0 }}
            >
                <span className="label-key">specimen</span> PLR-201
                <br />
                <span className="label-key">phase</span> clinical trial III
            </div>

            <div
                className="lab-annotation bottom-right"
                ref={addAnnotationRef}
                style={{ opacity: 0 }}
            >
                <span className="label-key">seq</span> 2.3B datapoints
                <br />
                <span className="label-key">uptime</span> 99.97%
            </div>

            {/* === SCROLL HINT === */}
            <div className="scroll-hint" ref={scrollRef} style={{ opacity: 0 }}>
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
