"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
    {
        number: "01",
        title: "Computational Genomics",
        desc: "Deep learning architectures mapping complex genetic pathways at single-nucleotide resolution. Predicting mutations before they occur.",
        tags: ["CRISPR-Seq", "Transformer Models", "Variant Calling"],
        stat: "2.4M",
        statLabel: "Sequences analyzed",
    },
    {
        number: "02",
        title: "Protein Engineering",
        desc: "De novo protein design through generative AI — building functional enzymes and antibodies from scratch.",
        tags: ["AlphaFold", "Diffusion Models", "Directed Evolution"],
        stat: "340+",
        statLabel: "Novel proteins designed",
    },
    {
        number: "03",
        title: "Synthetic Biology",
        desc: "Programming living systems with custom genetic circuits for therapeutic delivery and environmental remediation.",
        tags: ["Gene Circuits", "Metabolic Eng.", "Cell-Free Systems"],
        stat: "18",
        statLabel: "Active clinical programs",
    },
];

export function Research() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const smallCardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            const headerEls = headerRef.current?.querySelectorAll(".reveal-up");
            if (headerEls) {
                gsap.fromTo(
                    headerEls,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 82%",
                        },
                    }
                );
            }

            // Featured card — big dramatic entrance
            if (featuredRef.current) {
                gsap.fromTo(
                    featuredRef.current,
                    { y: 80, opacity: 0, scale: 0.97 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1.3,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: featuredRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }

            // Small cards — stagger in
            const smCards = smallCardsRef.current?.querySelectorAll(".rs-card-sm");
            if (smCards) {
                gsap.fromTo(
                    smCards,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.18,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: smallCardsRef.current,
                            start: "top 80%",
                        },
                    }
                );
            }

            // Counter animation for stats
            const statEls = sectionRef.current?.querySelectorAll(".rs-stat-num");
            statEls?.forEach((el) => {
                const raw = el.textContent || "";
                const suffix = raw.replace(/[\d.]/g, "");
                const num = parseFloat(raw);
                if (isNaN(num)) return;

                const obj = { val: 0 };
                gsap.to(obj, {
                    val: num,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                    onUpdate: () => {
                        (el as HTMLElement).textContent =
                            num >= 100
                                ? Math.floor(obj.val).toLocaleString() + suffix
                                : obj.val.toFixed(num % 1 !== 0 ? 1 : 0) + suffix;
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const featured = PILLARS[0];
    const rest = PILLARS.slice(1);

    return (
        <section className="research" id="research" ref={sectionRef}>
            {/* Organic transition shape */}
            <div className="rs-transition">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="rs-wave">
                    <path
                        d="M0,120 L0,60 Q180,0 360,45 Q540,90 720,50 Q900,10 1080,55 Q1260,100 1440,40 L1440,120 Z"
                        fill="#080a08"
                    />
                    <path
                        d="M0,120 L0,80 Q240,30 480,65 Q720,100 960,55 Q1200,10 1440,60 L1440,120 Z"
                        fill="rgba(107, 158, 130, 0.04)"
                    />
                </svg>
            </div>

            {/* Background texture */}
            <div className="rs-bg-mesh" />

            {/* Header — left-aligned editorial */}
            <div className="rs-inner">
                <div className="rs-header" ref={headerRef}>
                    <span className="rs-eyebrow reveal-up">Research Pipeline</span>
                    <h2 className="rs-title reveal-up">
                        Where computation<br />
                        meets <em>biology</em>
                    </h2>
                </div>

                {/* Featured card — big, asymmetric */}
                <div className="rs-featured" ref={featuredRef}>
                    <div className="rs-featured-left">
                        <span className="rs-card-num">{featured.number}</span>
                        <h3 className="rs-featured-title">{featured.title}</h3>
                        <p className="rs-featured-desc">{featured.desc}</p>
                        <div className="rs-tags">
                            {featured.tags.map((t) => (
                                <span className="rs-tag" key={t}>{t}</span>
                            ))}
                        </div>
                    </div>
                    <div className="rs-featured-right">
                        <div className="rs-stat-block">
                            <span className="rs-stat-num">{featured.stat}</span>
                            <span className="rs-stat-label">{featured.statLabel}</span>
                        </div>
                        {/* Decorative helix */}
                        <svg className="rs-helix" viewBox="0 0 80 200" fill="none">
                            <path d="M20,10 Q60,50 20,90 Q-20,130 20,170 Q60,210 20,250" stroke="rgba(107,158,130,0.2)" strokeWidth="1" fill="none" />
                            <path d="M60,10 Q20,50 60,90 Q100,130 60,170 Q20,210 60,250" stroke="rgba(107,158,130,0.12)" strokeWidth="1" fill="none" />
                            <circle cx="20" cy="10" r="3" fill="rgba(107,158,130,0.4)" />
                            <circle cx="60" cy="90" r="3" fill="rgba(107,158,130,0.3)" />
                            <circle cx="20" cy="170" r="3" fill="rgba(107,158,130,0.4)" />
                            <circle cx="40" cy="50" r="2" fill="rgba(139,184,158,0.25)" />
                            <circle cx="40" cy="130" r="2" fill="rgba(139,184,158,0.25)" />
                        </svg>
                    </div>
                    <div className="rs-featured-glow" />
                </div>

                {/* Smaller cards — side by side */}
                <div className="rs-pair" ref={smallCardsRef}>
                    {rest.map((p) => (
                        <div className="rs-card-sm" key={p.number}>
                            <div className="rs-card-sm-top">
                                <span className="rs-card-num">{p.number}</span>
                                <div className="rs-stat-block rs-stat-sm">
                                    <span className="rs-stat-num">{p.stat}</span>
                                    <span className="rs-stat-label">{p.statLabel}</span>
                                </div>
                            </div>
                            <h3 className="rs-card-sm-title">{p.title}</h3>
                            <p className="rs-card-sm-desc">{p.desc}</p>
                            <div className="rs-tags">
                                {p.tags.map((t) => (
                                    <span className="rs-tag" key={t}>{t}</span>
                                ))}
                            </div>
                            <div className="rs-card-accent" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
