"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Molecule } from "./molecule";
import { WordRotator } from "./word-rotator";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const moleculeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

            // Ken Burns — cinematic slow pan + zoom + color shift
            gsap.fromTo(
                imgRef.current,
                { scale: 1.05, x: "0%", y: "0%", filter: "brightness(0.55) saturate(0.8)" },
                {
                    scale: 1.35,
                    x: "-5%",
                    y: "-2%",
                    filter: "brightness(0.7) saturate(1.1)",
                    duration: 30,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                }
            );

            // Label
            tl.to(labelRef.current, { opacity: 1, duration: 0.7 });

            // Headline
            const lines = headlineRef.current?.querySelectorAll(".line-inner");
            if (lines) {
                tl.to(lines, { y: "0%", duration: 1.0, stagger: 0.07 }, "-=0.3");
            }

            // Description
            tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

            // CTA
            tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

            // Molecule — scale up + fade in
            tl.to(moleculeRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.6,
                ease: "power2.out",
            }, "-=0.9");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={containerRef}>
            {/* BG */}
            <div className="hero-bg">
                <img
                    ref={imgRef}
                    src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?q=80&w=3840&auto=format&fit=crop"
                    alt=""
                    loading="eager"
                />
                <div className="hero-vignette" />
                <div className="hero-particles" />
            </div>

            {/* Layout Grid */}
            <div className="hero-layout">
                {/* LEFT — Text */}
                <div className="hero-text">
                    <div className="hero-label" ref={labelRef}>
                        <div className="hero-label-line" />
                        <span>Biosciences · Zürich, Switzerland</span>
                    </div>

                    <h1 className="hero-headline" ref={headlineRef}>
                        <span className="line">
                            <span className="line-inner">Engineering</span>
                        </span>
                        <span className="line">
                            <span className="line-inner accent"><WordRotator /></span>
                        </span>
                        <span className="line">
                            <span className="line-inner">Code.</span>
                        </span>
                    </h1>

                    <p className="hero-desc" ref={descRef} style={{ transform: "translateY(12px)" }}>
                        We combine computational biology with generative AI
                        to decode — and redesign — the building blocks of life.
                    </p>

                    <div className="hero-cta" ref={ctaRef} style={{ transform: "translateY(10px)" }}>
                        <button className="btn-pill">
                            Explore research
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="btn-text">Our pipeline</button>
                    </div>
                </div>

                {/* RIGHT — Molecule */}
                <div
                    className="hero-molecule-wrapper"
                    ref={moleculeRef}
                >
                    <Molecule />
                </div>
            </div>
        </section>
    );
}
