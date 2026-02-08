"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouse = (e: MouseEvent) => {
            target.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("mousemove", handleMouse);

        let raf: number;
        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.08;
            pos.current.y += (target.current.y - pos.current.y) * 0.08;

            if (glowRef.current) {
                glowRef.current.style.left = `${pos.current.x}px`;
                glowRef.current.style.top = `${pos.current.y}px`;
            }

            raf = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouse);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
