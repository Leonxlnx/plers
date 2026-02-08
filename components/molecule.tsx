"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

// ─── Shape definitions (node positions relative to center) ───
const SHAPES = {
    // Protein molecule — organic, asymmetric
    molecule: [
        { x: 0, y: 0 },
        { x: -80, y: -55 },
        { x: 65, y: -70 },
        { x: 90, y: 25 },
        { x: 40, y: 85 },
        { x: -60, y: 70 },
        { x: -110, y: 10 },
        { x: -30, y: -110 },
        { x: 120, y: -40 },
        { x: 110, y: 80 },
        { x: -100, y: -100 },
        { x: -130, y: 60 },
    ],
    // DNA double helix — two interleaved spirals
    helix: [
        { x: 0, y: -120 },
        { x: 50, y: -85 },
        { x: -50, y: -85 },
        { x: -45, y: -30 },
        { x: 45, y: -30 },
        { x: 40, y: 25 },
        { x: -40, y: 25 },
        { x: -35, y: 80 },
        { x: 35, y: 80 },
        { x: 0, y: 120 },
        { x: 55, y: -55 },
        { x: -55, y: 55 },
    ],
    // Cell — circular arrangement with nucleus
    cell: [
        { x: 0, y: 0 },
        { x: 0, y: -95 },
        { x: 82, y: -48 },
        { x: 82, y: 48 },
        { x: 0, y: 95 },
        { x: -82, y: 48 },
        { x: -82, y: -48 },
        { x: 30, y: -25 },
        { x: -30, y: 25 },
        { x: 25, y: 30 },
        { x: -25, y: -30 },
        { x: 0, y: -45 },
    ],
    // Crystalline — lattice grid
    crystal: [
        { x: -60, y: -90 },
        { x: 0, y: -90 },
        { x: 60, y: -90 },
        { x: -90, y: -30 },
        { x: -30, y: -30 },
        { x: 30, y: -30 },
        { x: 90, y: -30 },
        { x: -60, y: 30 },
        { x: 0, y: 30 },
        { x: 60, y: 30 },
        { x: -30, y: 90 },
        { x: 30, y: 90 },
    ],
};

// Bonds per shape
const BONDS_MAP = {
    molecule: [
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 6], [1, 7], [2, 8], [2, 7],
        [3, 8], [4, 9], [5, 6], [5, 11],
        [1, 10], [10, 7],
    ],
    helix: [
        [0, 1], [0, 2], [1, 4], [2, 3],
        [3, 6], [4, 5], [5, 8], [6, 7],
        [7, 9], [8, 9], [1, 2], [3, 4],
        [5, 6], [7, 8], [10, 11],
    ],
    cell: [
        [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
        [0, 7], [0, 8], [0, 9], [0, 10], [0, 11],
        [7, 9], [8, 10], [10, 11], [7, 11],
    ],
    crystal: [
        [0, 1], [1, 2], [0, 3], [0, 4],
        [1, 4], [1, 5], [2, 5], [2, 6],
        [3, 7], [4, 7], [4, 8], [5, 8],
        [5, 9], [6, 9], [7, 10], [8, 10],
    ],
};

const SHAPE_NAMES = Object.keys(SHAPES) as (keyof typeof SHAPES)[];
const LABELS: Record<string, string[]> = {
    molecule: ["Gly", "Glycine", "75.03 g/mol"],
    helix: ["DNA", "Double Helix", "2nm width"],
    cell: ["Cell", "Eukaryote", "10-100μm"],
    crystal: ["NaCl", "Lattice", "5.6Å unit"],
};

const NODE_COUNT = 12;
const BOND_COUNT = 15;
const CX = 160;
const CY = 160;
const NODE_RADII = [22, 14, 16, 12, 15, 13, 10, 9, 8, 7, 7, 6];

export function Molecule() {
    const svgRef = useRef<SVGSVGElement>(null);
    const nodesRef = useRef<(SVGCircleElement | null)[]>([]);
    const highlightsRef = useRef<(SVGCircleElement | null)[]>([]);
    const bondsRef = useRef<(SVGLineElement | null)[]>([]);
    const orbitRef = useRef<SVGCircleElement>(null);
    const shapeIndexRef = useRef(0);
    const label1Ref = useRef<HTMLSpanElement>(null);
    const label2Ref = useRef<HTMLSpanElement>(null);
    const label3Ref = useRef<HTMLSpanElement>(null);

    const morphTo = useCallback((shapeKey: keyof typeof SHAPES) => {
        const shape = SHAPES[shapeKey];
        const bonds = BONDS_MAP[shapeKey];

        // Morph nodes
        shape.forEach((pos, i) => {
            const node = nodesRef.current[i];
            const highlight = highlightsRef.current[i];
            if (node) {
                gsap.to(node, {
                    attr: { cx: CX + pos.x, cy: CY + pos.y },
                    duration: 1.4,
                    ease: "power2.inOut",
                    delay: i * 0.03,
                });
            }
            if (highlight) {
                gsap.to(highlight, {
                    attr: {
                        cx: CX + pos.x - NODE_RADII[i] * 0.25,
                        cy: CY + pos.y - NODE_RADII[i] * 0.25,
                    },
                    duration: 1.4,
                    ease: "power2.inOut",
                    delay: i * 0.03,
                });
            }
        });

        // Morph bonds
        bonds.forEach(([from, to], i) => {
            const bond = bondsRef.current[i];
            if (bond) {
                gsap.to(bond, {
                    attr: {
                        x1: CX + shape[from].x,
                        y1: CY + shape[from].y,
                        x2: CX + shape[to].x,
                        y2: CY + shape[to].y,
                    },
                    duration: 1.4,
                    ease: "power2.inOut",
                    delay: i * 0.02,
                });
            }
        });

        // Update labels
        const labels = LABELS[shapeKey];
        const tl = gsap.timeline();
        tl.to([label1Ref.current, label2Ref.current, label3Ref.current], {
            opacity: 0,
            y: -5,
            duration: 0.3,
            stagger: 0.05,
            onComplete: () => {
                if (label1Ref.current) label1Ref.current.textContent = labels[0];
                if (label2Ref.current) label2Ref.current.textContent = labels[1];
                if (label3Ref.current) label3Ref.current.textContent = labels[2];
            },
        });
        tl.to([label1Ref.current, label2Ref.current, label3Ref.current], {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.1,
        });
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        // Gentle floating
        gsap.to(svgRef.current, {
            rotation: 6,
            duration: 14,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "center",
        });

        // Node pulse
        nodesRef.current.forEach((node, i) => {
            if (node) {
                gsap.to(node, {
                    attr: { r: NODE_RADII[i] * 1.12 },
                    duration: 2.5 + i * 0.2,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.1,
                });
            }
        });

        // Bond shimmer
        bondsRef.current.forEach((bond, i) => {
            if (bond) {
                gsap.to(bond, {
                    opacity: 0.12,
                    duration: 3 + i * 0.15,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                });
            }
        });

        // Orbit
        if (orbitRef.current) {
            gsap.to(orbitRef.current, {
                rotation: 360,
                duration: 20,
                ease: "none",
                repeat: -1,
                transformOrigin: `${CX}px ${CY}px`,
            });
        }

        // Shape cycling: morph every 5 seconds
        const interval = setInterval(() => {
            shapeIndexRef.current = (shapeIndexRef.current + 1) % SHAPE_NAMES.length;
            morphTo(SHAPE_NAMES[shapeIndexRef.current]);
        }, 5000);

        return () => clearInterval(interval);
    }, [morphTo]);

    const initialShape = SHAPES.molecule;
    const initialBonds = BONDS_MAP.molecule;

    return (
        <div className="molecule-wrapper">
            <div className="molecule-glow" />

            <svg
                ref={svgRef}
                viewBox="0 0 320 320"
                className="molecule-svg"
                fill="none"
            >
                {/* Bonds */}
                {initialBonds.map(([from, to], i) => (
                    <line
                        key={`bond-${i}`}
                        ref={(el) => { bondsRef.current[i] = el; }}
                        className="mol-bond"
                        x1={CX + initialShape[from].x}
                        y1={CY + initialShape[from].y}
                        x2={CX + initialShape[to].x}
                        y2={CY + initialShape[to].y}
                        stroke="rgba(139, 184, 158, 0.4)"
                        strokeWidth="1"
                    />
                ))}

                {/* Orbit ring for primary node */}
                <circle
                    ref={orbitRef}
                    cx={CX}
                    cy={CY}
                    r={34}
                    fill="none"
                    stroke="rgba(107, 158, 130, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                    className="mol-orbit"
                />

                {/* Nodes */}
                {initialShape.map((pos, i) => (
                    <g key={`node-${i}`}>
                        <circle
                            ref={(el) => { nodesRef.current[i] = el; }}
                            className="mol-node"
                            cx={CX + pos.x}
                            cy={CY + pos.y}
                            r={NODE_RADII[i]}
                            fill={i === 0
                                ? "rgba(107, 158, 130, 0.65)"
                                : `rgba(107, 158, 130, ${0.3 + (NODE_RADII[i] / 35)})`
                            }
                            stroke={`rgba(139, 184, 158, ${i === 0 ? 0.6 : 0.35})`}
                            strokeWidth={i === 0 ? 1.5 : 1}
                        />
                        <circle
                            ref={(el) => { highlightsRef.current[i] = el; }}
                            cx={CX + pos.x - NODE_RADII[i] * 0.25}
                            cy={CY + pos.y - NODE_RADII[i] * 0.25}
                            r={NODE_RADII[i] * 0.3}
                            fill="rgba(255, 255, 255, 0.1)"
                        />
                    </g>
                ))}
            </svg>

            {/* Annotation card */}
            <div className="mol-annotation mol-ann-main">
                <span className="mol-ann-value" ref={label1Ref}>Gly</span>
                <span className="mol-ann-label" ref={label2Ref}>Glycine</span>
                <span className="mol-ann-sub" ref={label3Ref}>75.03 g/mol</span>
            </div>
        </div>
    );
}
