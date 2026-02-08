"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ParticleField } from "./particle-field";

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power4.out" },
                delay: 0.3,
            });

            // Animate the label badge
            tl.fromTo(
                labelRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8 }
            );

            // Animate each headline line sliding up
            const lineInners = headlineRef.current?.querySelectorAll(".line-inner");
            if (lineInners) {
                tl.to(
                    lineInners,
                    {
                        y: "0%",
                        duration: 1.2,
                        stagger: 0.1,
                        ease: "power4.out",
                    },
                    "-=0.4"
                );
            }

            // Animate description
            tl.fromTo(
                descRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8 },
                "-=0.6"
            );

            // Animate CTA buttons
            const buttons = actionsRef.current?.children;
            if (buttons) {
                tl.fromTo(
                    buttons,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
                    "-=0.4"
                );
            }

            // Animate stats
            const stats = statsRef.current?.children;
            if (stats) {
                tl.fromTo(
                    stats,
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
                    "-=0.3"
                );
            }

            // Animate scroll indicator
            tl.fromTo(
                scrollRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.6 },
                "-=0.2"
            );

            // Stats counter animation
            const counters = statsRef.current?.querySelectorAll("[data-count]");
            if (counters) {
                counters.forEach((el) => {
                    const target = parseFloat(el.getAttribute("data-count") || "0");
                    const suffix = el.getAttribute("data-suffix") || "";
                    const isDecimal = target % 1 !== 0;

                    gsap.fromTo(
                        { val: 0 },
                        { val: target },
                        {
                            val: target,
                            duration: 2,
                            delay: 1.5,
                            ease: "power2.out",
                            onUpdate: function () {
                                const current = this.targets()[0].val;
                                el.textContent = isDecimal
                                    ? current.toFixed(1) + suffix
                                    : Math.floor(current) + suffix;
                            },
                        }
                    );
                });
            }
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={heroRef}>
            {/* Background layers */}
            <div className="hero-bg-gradient" aria-hidden="true" />
            <div className="hero-grid" aria-hidden="true" />

            {/* Particle system */}
            <ParticleField />

            {/* Main content */}
            <div className="hero-content">
                <div className="hero-label" ref={labelRef} style={{ opacity: 0 }}>
                    <span className="hero-label-dot" />
                    Biotech · KI · Genomik
                </div>

                <h1 className="hero-headline" ref={headlineRef}>
                    <span className="line">
                        <span className="line-inner">Die Zukunft der</span>
                    </span>
                    <span className="line">
                        <span className="line-inner">Medizin beginnt</span>
                    </span>
                    <span className="line">
                        <span className="line-inner">
                            auf <span className="highlight">molekularer</span> Ebene.
                        </span>
                    </span>
                </h1>

                <p className="hero-description" ref={descRef} style={{ opacity: 0 }}>
                    Plers verbindet Biotechnologie mit künstlicher Intelligenz, um
                    personalisierte Therapien zu entwickeln, die das Potenzial haben,
                    Millionen von Leben zu verändern.
                </p>

                <div className="hero-actions" ref={actionsRef}>
                    <button className="btn-primary">
                        <span>Unsere Forschung</span>
                        <svg
                            className="btn-arrow"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M3 8H13M13 8L9 4M13 8L9 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <button className="btn-secondary">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle
                                cx="8"
                                cy="8"
                                r="6"
                                stroke="currentColor"
                                strokeWidth="1"
                                opacity="0.5"
                            />
                            <path
                                d="M6.5 5.5L10.5 8L6.5 10.5V5.5Z"
                                fill="currentColor"
                                opacity="0.7"
                            />
                        </svg>
                        Showreel ansehen
                    </button>
                </div>
            </div>

            {/* Stats bar */}
            <div className="hero-stats" ref={statsRef}>
                <div className="hero-stat" style={{ opacity: 0 }}>
                    <span className="hero-stat-value">
                        <span data-count="150" data-suffix="+">0</span>
                        <span className="accent">+</span>
                    </span>
                    <span className="hero-stat-label">Forschungsprojekte</span>
                </div>
                <div className="hero-stat" style={{ opacity: 0 }}>
                    <span className="hero-stat-value">
                        <span data-count="12" data-suffix="">0</span>
                    </span>
                    <span className="hero-stat-label">Klinische Studien</span>
                </div>
                <div className="hero-stat" style={{ opacity: 0 }}>
                    <span className="hero-stat-value">
                        <span data-count="40" data-suffix="+">0</span>
                        <span className="accent">+</span>
                    </span>
                    <span className="hero-stat-label">Patente</span>
                </div>
                <div className="hero-stat" style={{ opacity: 0 }}>
                    <span className="hero-stat-value">
                        <span data-count="2.3" data-suffix=" Mrd.">0</span>
                    </span>
                    <span className="hero-stat-label">Datenpunkte analysiert</span>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator" ref={scrollRef} style={{ opacity: 0 }}>
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
