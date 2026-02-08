"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const glassRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

            // Ken Burns zoom on image
            gsap.fromTo(
                imgRef.current,
                { scale: 1.0 },
                { scale: 1.12, duration: 25, ease: "none", repeat: -1, yoyo: true }
            );

            // Label
            tl.to(labelRef.current, { opacity: 1, duration: 0.8 });

            // Headline lines
            const lines = headlineRef.current?.querySelectorAll(".line-inner");
            if (lines) {
                tl.to(lines, { y: "0%", duration: 1.0, stagger: 0.08 }, "-=0.4");
            }

            // Description
            tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");

            // CTA
            tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

            // Glass card
            tl.to(glassRef.current, { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" }, "-=0.6");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={containerRef}>
            {/* BG Image */}
            <div className="hero-bg">
                <img
                    ref={imgRef}
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop"
                    alt=""
                    loading="eager"
                />
                <div className="hero-vignette" />
            </div>

            {/* Main Content — bottom left */}
            <div className="hero-content">
                <div className="hero-label" ref={labelRef}>
                    <div className="hero-label-line" />
                    <span>Biosciences · Zürich</span>
                </div>

                <h1 className="hero-headline" ref={headlineRef}>
                    <span className="line">
                        <span className="line-inner">Engineering</span>
                    </span>
                    <span className="line">
                        <span className="line-inner accent">Nature&apos;s</span>
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
                    <button className="btn-primary">
                        Explore research
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button className="btn-ghost">Learn more</button>
                </div>
            </div>

            {/* Glass Card — top right */}
            <div
                className="glass-card"
                ref={glassRef}
                style={{
                    position: "absolute",
                    top: "clamp(7rem, 14vh, 10rem)",
                    right: "clamp(2rem, 5vw, 8rem)",
                    width: "280px",
                    transform: "translateX(30px)",
                }}
            >
                <div className="glass-card-label">Current Focus</div>
                <div className="glass-card-title">Bio-Algorithmic Growth</div>
                <p className="glass-card-body">
                    Generative models that predict protein folding 10,000× faster than traditional simulation.
                </p>
                <div className="glass-card-status">
                    <span className="dot" />
                    System Active
                </div>
            </div>
        </section>
    );
}
