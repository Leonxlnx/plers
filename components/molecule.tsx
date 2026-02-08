"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

// ─── Chemically/biologically accurate shape definitions ───

const SHAPES = {
    // Caffeine molecule — two fused rings (hexagon + pentagon) with side chains
    caffeine: [
        // Hexagonal ring (6 atoms)
        { x: -40, y: -70 },  // 0 - N
        { x: 30, y: -85 },   // 1 - C
        { x: 75, y: -30 },   // 2 - C
        { x: 55, y: 35 },    // 3 - N
        { x: -15, y: 40 },   // 4 - C
        { x: -55, y: -10 },  // 5 - C
        // Pentagon ring (shares atoms 3,4; adds 3 new)
        { x: 110, y: 30 },   // 6 - C
        { x: 100, y: 95 },   // 7 - N
        { x: 30, y: 95 },    // 8 - C
        // Side chains (methyl groups, =O)
        { x: -100, y: -130 },// 9 - CH₃ on N(0)
        { x: -120, y: -10 }, // 10 - CH₃ on C(5)
        { x: 155, y: -10 },  // 11 - =O on C(6)
    ],

    // DNA Double Helix — two strands with base pair rungs
    dna: [
        // Strand A (left backbone)
        { x: -55, y: -120 },  // 0
        { x: -70, y: -60 },   // 1
        { x: -45, y: 0 },     // 2
        { x: -70, y: 60 },    // 3
        { x: -55, y: 120 },   // 4
        // Strand B (right backbone)
        { x: 55, y: -100 },   // 5
        { x: 70, y: -40 },    // 6
        { x: 45, y: 20 },     // 7
        { x: 70, y: 80 },     // 8
        { x: 55, y: 130 },    // 9
        // Cross-links (base pairs)
        { x: -10, y: -90 },   // 10
        { x: 10, y: 45 },     // 11
    ],

    // Antibody (IgG Y-shape) — immunoglobulin structure
    antibody: [
        // Left Fab arm
        { x: -110, y: -80 },  // 0 - VL
        { x: -80, y: -45 },   // 1 - CL
        // Right Fab arm
        { x: 110, y: -80 },   // 2 - VH
        { x: 80, y: -45 },    // 3 - CH1
        // Hinge region
        { x: -30, y: -10 },   // 4
        { x: 30, y: -10 },    // 5
        { x: 0, y: 15 },      // 6 - hinge center
        // Fc stem
        { x: -25, y: 55 },    // 7 - CH2
        { x: 25, y: 55 },     // 8 - CH2
        { x: -20, y: 105 },   // 9 - CH3
        { x: 20, y: 105 },    // 10 - CH3
        // Antigen binding tips
        { x: -130, y: -115 }, // 11 - binding site
    ],

    // Phospholipid bilayer — cell membrane cross section
    membrane: [
        // Top layer heads (hydrophilic)
        { x: -90, y: -40 },  // 0
        { x: -30, y: -45 },  // 1
        { x: 30, y: -40 },   // 2
        { x: 90, y: -45 },   // 3
        // Top layer tails (hydrophobic) — pointing down
        { x: -90, y: 0 },    // 4
        { x: -30, y: -5 },   // 5
        { x: 30, y: 0 },     // 6
        { x: 90, y: -5 },    // 7
        // Bottom layer heads (hydrophilic)
        { x: -60, y: 65 },   // 8
        { x: 0, y: 60 },     // 9
        { x: 60, y: 65 },    // 10
        // Bottom layer tails (hydrophobic) — pointing up
        { x: -60, y: 30 },   // 11
    ],
};

// Bond connectivity per shape
const BONDS_MAP = {
    caffeine: [
        // Hexagonal ring
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
        // Pentagon ring
        [3, 6], [6, 7], [7, 8], [8, 4],
        // Side chains
        [0, 9], [5, 10], [6, 11],
        // Double bonds (same as single visually)
        [1, 5], [2, 6],
    ],
    dna: [
        // Strand A backbone
        [0, 1], [1, 2], [2, 3], [3, 4],
        // Strand B backbone
        [5, 6], [6, 7], [7, 8], [8, 9],
        // Base pairs (cross-links)
        [0, 10], [10, 5],
        [1, 6],
        [2, 11], [11, 7],
        [3, 8],
        [4, 9],
    ],
    antibody: [
        // Left arm
        [0, 1], [1, 4],
        // Right arm
        [2, 3], [3, 5],
        // Hinge
        [4, 6], [5, 6],
        // Fc stem
        [6, 7], [6, 8], [7, 9], [8, 10],
        // Binding sites
        [0, 11],
        // Cross connections
        [7, 8], [9, 10],
        [1, 3], [4, 5],
    ],
    membrane: [
        // Top layer: head → tail
        [0, 4], [1, 5], [2, 6], [3, 7],
        // Bottom layer: head → tail
        [8, 11], [9, 11], [10, 11],
        // Head connections (membrane surface)
        [0, 1], [1, 2], [2, 3],
        [8, 9], [9, 10],
        // Tail interdigitation
        [4, 5], [5, 6], [6, 7],
        [5, 11],
    ],
};

const SHAPE_NAMES = Object.keys(SHAPES) as (keyof typeof SHAPES)[];
const LABELS: Record<string, [string, string, string]> = {
    caffeine: ["C₈H₁₀N₄O₂", "Caffeine", "194.19 g/mol"],
    dna: ["A-T / G-C", "DNA Helix", "2nm ⌀"],
    antibody: ["IgG", "Antibody", "150 kDa"],
    membrane: ["Bilayer", "Phospholipid", "~5nm thick"],
};

const NODE_COUNT = 12;
const BOND_COUNT = 15;
const CX = 160;
const CY = 160;

// Node radii — larger for "important" atoms, smaller for side groups
const BASE_RADII = [14, 12, 12, 14, 12, 12, 10, 10, 10, 8, 8, 7];

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

        // Morph nodes with stagger
        shape.forEach((pos, i) => {
            const node = nodesRef.current[i];
            const highlight = highlightsRef.current[i];
            if (node) {
                gsap.to(node, {
                    attr: { cx: CX + pos.x, cy: CY + pos.y },
                    duration: 1.6,
                    ease: "elastic.out(1, 0.75)",
                    delay: i * 0.04,
                });
            }
            if (highlight) {
                gsap.to(highlight, {
                    attr: {
                        cx: CX + pos.x - BASE_RADII[i] * 0.25,
                        cy: CY + pos.y - BASE_RADII[i] * 0.25,
                    },
                    duration: 1.6,
                    ease: "elastic.out(1, 0.75)",
                    delay: i * 0.04,
                });
            }
        });

        // Morph bonds
        bonds.forEach(([from, to], i) => {
            const bond = bondsRef.current[i];
            if (bond) {
                // Flash effect: fade out → move → fade in
                gsap.to(bond, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.set(bond, {
                            attr: {
                                x1: CX + shape[from].x,
                                y1: CY + shape[from].y,
                                x2: CX + shape[to].x,
                                y2: CY + shape[to].y,
                            },
                        });
                        gsap.to(bond, {
                            opacity: 0.4,
                            duration: 0.6,
                            delay: 0.3 + i * 0.02,
                        });
                    },
                });
            }
        });

        // Update labels with smooth transition
        const labels = LABELS[shapeKey];
        const tl = gsap.timeline();
        tl.to([label1Ref.current, label2Ref.current, label3Ref.current], {
            opacity: 0,
            y: -6,
            duration: 0.3,
            stagger: 0.04,
            onComplete: () => {
                if (label1Ref.current) label1Ref.current.textContent = labels[0];
                if (label2Ref.current) label2Ref.current.textContent = labels[1];
                if (label3Ref.current) label3Ref.current.textContent = labels[2];
            },
        });
        tl.to([label1Ref.current, label2Ref.current, label3Ref.current], {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.04,
        });
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        // Gentle floating
        gsap.to(svgRef.current, {
            rotation: 5,
            duration: 16,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: "center",
        });

        // Node breathing
        nodesRef.current.forEach((node, i) => {
            if (node) {
                gsap.to(node, {
                    attr: { r: BASE_RADII[i] * 1.1 },
                    duration: 2.5 + i * 0.25,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.12,
                });
            }
        });

        // Bond shimmer
        bondsRef.current.forEach((bond, i) => {
            if (bond) {
                gsap.to(bond, {
                    opacity: 0.15,
                    duration: 3.5 + i * 0.2,
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
                duration: 25,
                ease: "none",
                repeat: -1,
                transformOrigin: `${CX}px ${CY}px`,
            });
        }

        // Shape cycling every 5s
        const interval = setInterval(() => {
            shapeIndexRef.current = (shapeIndexRef.current + 1) % SHAPE_NAMES.length;
            morphTo(SHAPE_NAMES[shapeIndexRef.current]);
        }, 5000);

        return () => clearInterval(interval);
    }, [morphTo]);

    const init = SHAPES.caffeine;
    const initBonds = BONDS_MAP.caffeine;

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
                {initBonds.map(([from, to], i) => (
                    <line
                        key={`b-${i}`}
                        ref={(el) => { bondsRef.current[i] = el; }}
                        className="mol-bond"
                        x1={CX + init[from].x}
                        y1={CY + init[from].y}
                        x2={CX + init[to].x}
                        y2={CY + init[to].y}
                        stroke="rgba(139, 184, 158, 0.4)"
                        strokeWidth="1"
                    />
                ))}

                {/* Orbit ring */}
                <circle
                    ref={orbitRef}
                    cx={CX}
                    cy={CY}
                    r={36}
                    fill="none"
                    stroke="rgba(107, 158, 130, 0.12)"
                    strokeWidth="1"
                    strokeDasharray="3 6"
                />

                {/* Nodes */}
                {init.map((pos, i) => (
                    <g key={`n-${i}`}>
                        <circle
                            ref={(el) => { nodesRef.current[i] = el; }}
                            className="mol-node"
                            cx={CX + pos.x}
                            cy={CY + pos.y}
                            r={BASE_RADII[i]}
                            fill={`rgba(107, 158, 130, ${0.35 + (BASE_RADII[i] / 30)})`}
                            stroke={`rgba(139, 184, 158, ${0.3 + (BASE_RADII[i] / 40)})`}
                            strokeWidth={1}
                        />
                        <circle
                            ref={(el) => { highlightsRef.current[i] = el; }}
                            cx={CX + pos.x - BASE_RADII[i] * 0.25}
                            cy={CY + pos.y - BASE_RADII[i] * 0.25}
                            r={BASE_RADII[i] * 0.28}
                            fill="rgba(255, 255, 255, 0.1)"
                        />
                    </g>
                ))}
            </svg>

            {/* Info card */}
            <div className="mol-annotation mol-ann-main">
                <span className="mol-ann-value" ref={label1Ref}>C₈H₁₀N₄O₂</span>
                <span className="mol-ann-label" ref={label2Ref}>Caffeine</span>
                <span className="mol-ann-sub" ref={label3Ref}>194.19 g/mol</span>
            </div>
        </div>
    );
}
