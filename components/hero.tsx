"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Specimen } from "./specimen";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const specimenRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 });

            // Ken Burns
            gsap.fromTo(
                imgRef.current,
                { scale: 1.0, x: "0%", filter: "brightness(0.65)" },
                {
                    scale: 1.25,
                    x: "-3%",
                    filter: "brightness(0.8)",
                    duration: 22,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                }
            );

            // Nav card
            tl.to(".nav-card", { opacity: 1, y: 0, duration: 0.6 });

            // Label
            tl.to(labelRef.current, { opacity: 1, duration: 0.7 }, "-=0.3");

            // Headline
            const lines = headlineRef.current?.querySelectorAll(".line-inner");
            if (lines) {
                tl.to(lines, { y: "0%", duration: 1.0, stagger: 0.07 }, "-=0.3");
            }

            // Description
            tl.to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");

            // CTA
            tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");

            // Specimen — scale up + fade in
            tl.to(specimenRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: "power2.out",
            }, "-=0.8");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={containerRef}>
            {/* BG */}
            <div className="hero-bg">
                <img
                    ref={imgRef}
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop"
                    alt=""
                    loading="eager"
                />
                <div className="hero-vignette" />
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
                        <button className="btn-pill">
                            Explore research
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="btn-text">Our pipeline</button>
                    </div>
                </div>

                {/* RIGHT — Specimen Viewer */}
                <div
                    className="hero-specimen-wrapper"
                    ref={specimenRef}
                    style={{ opacity: 0, transform: "scale(0.85)" }}
                >
                    <Specimen />
                </div>
            </div>
        </section>
    );
}
