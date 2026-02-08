"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Specimen() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Subtle parallax drift on the whole specimen
        const cells = containerRef.current.querySelectorAll(".cell");
        cells.forEach((cell, i) => {
            gsap.to(cell, {
                x: `random(-8, 8)`,
                y: `random(-8, 8)`,
                duration: 4 + i * 0.7,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            });
        });
    }, []);

    return (
        <div className="specimen" ref={containerRef}>
            {/* Rotating outer ring */}
            <div className="specimen-ring" />
            <div className="specimen-ring-inner" />

            {/* Crosshair */}
            <div className="crosshair-h" />
            <div className="crosshair-v" />

            {/* Glass dish interior */}
            <div className="dish-interior">
                {/* Floating cells */}
                <div className="cell cell-1" />
                <div className="cell cell-2" />
                <div className="cell cell-3" />
                <div className="cell cell-4" />
                <div className="cell cell-5" />
                <div className="cell cell-6" />
                <div className="cell cell-7" />
                <div className="cell cell-8" />

                {/* Focus ring */}
                <div className="focus-ring" />
            </div>

            {/* Labels around the ring */}
            <div className="specimen-label label-top">
                <span>magnification: 400×</span>
            </div>
            <div className="specimen-label label-right">
                <span>λ 520nm</span>
            </div>
            <div className="specimen-label label-bottom">
                <span>specimen a-7 · prep 12.08</span>
            </div>
            <div className="specimen-label label-left">
                <span>bright-field</span>
            </div>

            {/* Corner markers */}
            <div className="corner-mark top-left" />
            <div className="corner-mark top-right" />
            <div className="corner-mark bottom-left" />
            <div className="corner-mark bottom-right" />
        </div>
    );
}
