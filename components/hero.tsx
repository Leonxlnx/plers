"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const glassRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power2.out" },
            });

            // 1. Image Zoom (Subtle Scale)
            gsap.to(imageRef.current, {
                scale: 1.15,
                duration: 20,
                ease: "none",
                repeat: -1,
                yoyo: true,
            });

            // 2. Title Reveals
            const splittedText = titleRef.current?.querySelectorAll(".char-wrapper");
            if (splittedText) {
                tl.to(splittedText, {
                    y: "0%",
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.05,
                    ease: "power3.out",
                }, "+=0.2");
            }

            // 3. Glass Card Intro
            tl.fromTo(
                glassRef.current,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
                "-=0.8"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden bg-black text-white"
        >
            {/* BACKGROUND IMAGE - Cinematic Zoom */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    ref={imageRef}
                    src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2600&auto=format&fit=crop" // High-res macro leaf
                    alt="Abstract Organic Structure"
                    fill
                    priority
                    className="object-cover opacity-80"
                    sizes="100vw"
                />
                {/* Vignette Overlay for focus */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* CONTENT LAYER */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end pb-24 px-8 md:px-20 lg:px-32">

                {/* BIG TYPOGRAPHY (Bottom Left) */}
                <div className="max-w-[90vw] md:max-w-4xl">
                    <div className="flex items-center gap-4 mb-6 opacity-60">
                        <span className="w-12 h-[1px] bg-white"></span>
                        <span className="uppercase tracking-[0.3em] text-xs font-sans">Est. 2019 • Zürich</span>
                    </div>

                    <h1 ref={titleRef} className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
                        <span className="block overflow-hidden">
                            <span className="char-wrapper block translate-y-full opacity-0">Engineering</span>
                        </span>
                        <span className="block overflow-hidden ml-12 md:ml-24 italic text-[#C8FF00]"> {/* Acid Lime Accent */}
                            <span className="char-wrapper block translate-y-full opacity-0">Nature&apos;s</span>
                        </span>
                        <span className="block overflow-hidden">
                            <span className="char-wrapper block translate-y-full opacity-0">Code.</span>
                        </span>
                    </h1>
                </div>

                {/* GLASS CARD (Floating Top Right - Asymmetric Balance) */}
                <div
                    ref={glassRef}
                    className="absolute top-32 right-8 md:right-20 lg:right-32 w-72 glass-panel p-8 opacity-0 hidden md:block"
                >
                    <div className="text-xs uppercase tracking-widest text-white/50 mb-4">Current Synthesis</div>
                    <div className="font-display text-2xl mb-2 leading-none">Bio-Algorithmic<br />Growth</div>
                    <p className="text-sm text-white/70 font-sans leading-relaxed mt-4">
                        We use generative models to predict protein folding 10,000x faster than traditional simulation.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#C8FF00]">
                        <span>●</span> <span>Sytem Active</span>
                    </div>
                </div>

                {/* CTA (Minimal, integrated) */}
                <div className="absolute bottom-10 right-8 md:right-20 lg:right-32 flex items-center gap-6">
                    <button className="text-sm font-medium hover:text-[#C8FF00] transition-colors uppercase tracking-widest">
                        Explore Work
                    </button>
                    <div className="w-16 h-[1px] bg-white/20"></div>
                </div>

            </div>
        </section>
    );
}
