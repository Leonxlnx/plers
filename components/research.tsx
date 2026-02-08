"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
    {
        number: "01",
        title: "Computational Genomics",
        desc: "Leveraging deep learning architectures to map, predict, and re-engineer complex genetic pathways at single-nucleotide resolution.",
        tags: ["CRISPR-Seq", "Transformer Models", "Variant Calling"],
        stat: "2.4M",
        statLabel: "Sequences analyzed",
    },
    {
        number: "02",
        title: "Protein Engineering",
        desc: "De novo protein design through generative AI — building functional enzymes, antibodies, and structural proteins from scratch.",
        tags: ["AlphaFold", "Diffusion Models", "Directed Evolution"],
        stat: "340+",
        statLabel: "Novel proteins designed",
    },
    {
        number: "03",
        title: "Synthetic Biology",
        desc: "Programming living systems with custom genetic circuits for therapeutic delivery, bio-manufacturing, and environmental remediation.",
        tags: ["Gene Circuits", "Metabolic Eng.", "Cell-Free Systems"],
        stat: "18",
        statLabel: "Active clinical programs",
    },
];

export function Research() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            const headerElements = headerRef.current?.querySelectorAll(".reveal-up");
            if (headerElements) {
                gsap.fromTo(
                    headerElements,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.12,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Cards reveal
            const cards = cardsRef.current?.querySelectorAll(".research-card");
            if (cards) {
                gsap.fromTo(
                    cards,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.1,
                        stagger: 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 78%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Card inner elements — stagger tags
            cards?.forEach((card) => {
                const tags = card.querySelectorAll(".research-tag");
                gsap.fromTo(
                    tags,
                    { scale: 0.8, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.08,
                        ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="research" id="research" ref={sectionRef}>
            {/* Transition gradient */}
            <div className="section-transition" />

            {/* Section header */}
            <div className="research-header" ref={headerRef}>
                <div className="research-label reveal-up">
                    <div className="research-label-line" />
                    <span>Our Research</span>
                </div>
                <h2 className="research-headline reveal-up">
                    Three pillars.<br />
                    <span className="accent-dim">One mission.</span>
                </h2>
                <p className="research-intro reveal-up">
                    From genome to organism — we operate at every scale of biology,
                    united by the conviction that nature&apos;s complexity is not a barrier
                    but a blueprint.
                </p>
            </div>

            {/* Research cards */}
            <div className="research-grid" ref={cardsRef}>
                {PILLARS.map((pillar) => (
                    <article className="research-card" key={pillar.number}>
                        <div className="card-top">
                            <span className="card-number">{pillar.number}</span>
                            <div className="card-stat">
                                <span className="stat-value">{pillar.stat}</span>
                                <span className="stat-label">{pillar.statLabel}</span>
                            </div>
                        </div>

                        <h3 className="card-title">{pillar.title}</h3>
                        <p className="card-desc">{pillar.desc}</p>

                        <div className="card-tags">
                            {pillar.tags.map((tag) => (
                                <span className="research-tag" key={tag}>{tag}</span>
                            ))}
                        </div>

                        <div className="card-line" />
                    </article>
                ))}
            </div>
        </section>
    );
}
