"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Node positions for a stylized molecule (relative to center)
const NODES = [
    { x: 0, y: 0, r: 22, primary: true },
    { x: -80, y: -55, r: 14 },
    { x: 65, y: -70, r: 16 },
    { x: 90, y: 25, r: 12 },
    { x: 40, y: 85, r: 15 },
    { x: -60, y: 70, r: 13 },
    { x: -110, y: 10, r: 10 },
    { x: -30, y: -110, r: 9 },
    { x: 120, y: -40, r: 8 },
    { x: 110, y: 80, r: 7 },
    { x: -100, y: -100, r: 7 },
    { x: -130, y: 60, r: 6 },
];

// Connections between nodes (indices)
const BONDS = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 6], [1, 7], [2, 8], [2, 7],
    [3, 8], [4, 9], [5, 6], [5, 11],
    [1, 10], [10, 7],
];

const CX = 160;
const CY = 160;

export function Molecule() {
    const svgRef = useRef<SVGSVGElement>(null);
    const groupRef = useRef<SVGGElement>(null);

    useEffect(() => {
        if (!svgRef.current || !groupRef.current) return;

        // Gentle floating rotation
        gsap.to(groupRef.current, {
            rotation: 8,
            duration: 12,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            transformOrigin: `${CX}px ${CY}px`,
        });

        // Node pulse
        const nodes = svgRef.current.querySelectorAll(".mol-node");
        nodes.forEach((node, i) => {
            gsap.to(node, {
                scale: 1.15,
                opacity: 0.7,
                duration: 2 + i * 0.3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                transformOrigin: "center",
                delay: i * 0.15,
            });
        });

        // Bond shimmer
        const bonds = svgRef.current.querySelectorAll(".mol-bond");
        bonds.forEach((bond, i) => {
            gsap.to(bond, {
                opacity: 0.15,
                duration: 3 + i * 0.2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: i * 0.1,
            });
        });
    }, []);

    return (
        <div className="molecule-wrapper">
            {/* Glow backdrop */}
            <div className="molecule-glow" />

            <svg
                ref={svgRef}
                viewBox="0 0 320 320"
                className="molecule-svg"
                fill="none"
            >
                <g ref={groupRef}>
                    {/* Bonds */}
                    {BONDS.map(([from, to], i) => (
                        <line
                            key={`bond-${i}`}
                            className="mol-bond"
                            x1={CX + NODES[from].x}
                            y1={CY + NODES[from].y}
                            x2={CX + NODES[to].x}
                            y2={CY + NODES[to].y}
                            stroke="rgba(107, 158, 130, 0.35)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Nodes */}
                    {NODES.map((node, i) => (
                        <g key={`node-${i}`}>
                            {/* Outer glow ring for primary */}
                            {node.primary && (
                                <circle
                                    cx={CX + node.x}
                                    cy={CY + node.y}
                                    r={node.r + 12}
                                    fill="none"
                                    stroke="rgba(107, 158, 130, 0.12)"
                                    strokeWidth="1"
                                    strokeDasharray="3 4"
                                    className="mol-orbit"
                                />
                            )}

                            {/* Node */}
                            <circle
                                className="mol-node"
                                cx={CX + node.x}
                                cy={CY + node.y}
                                r={node.r}
                                fill={node.primary
                                    ? "rgba(107, 158, 130, 0.6)"
                                    : `rgba(107, 158, 130, ${0.25 + (node.r / 40)})`
                                }
                                stroke={`rgba(139, 184, 158, ${node.primary ? 0.6 : 0.3})`}
                                strokeWidth={node.primary ? 1.5 : 1}
                            />

                            {/* Inner highlight */}
                            <circle
                                cx={CX + node.x - node.r * 0.25}
                                cy={CY + node.y - node.r * 0.25}
                                r={node.r * 0.35}
                                fill="rgba(255, 255, 255, 0.08)"
                            />
                        </g>
                    ))}
                </g>
            </svg>

            {/* Data annotations */}
            <div className="mol-annotation mol-ann-1">
                <span className="mol-ann-value">Gly</span>
                <span className="mol-ann-label">Glycine</span>
            </div>
            <div className="mol-annotation mol-ann-2">
                <span className="mol-ann-value">C₂H₅NO₂</span>
            </div>
            <div className="mol-annotation mol-ann-3">
                <span className="mol-ann-value">75.03</span>
                <span className="mol-ann-label">g/mol</span>
            </div>
        </div>
    );
}
