"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    opacityDir: number;
}

export function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);

    const COUNT = 30;
    const CONNECT_DIST = 140;

    const init = useCallback((w: number, h: number) => {
        const particles: Particle[] = [];
        for (let i = 0; i < COUNT; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.12,
                vy: (Math.random() - 0.5) * 0.12,
                radius: Math.random() * 1.2 + 0.3,
                opacity: Math.random() * 0.15 + 0.03,
                opacityDir: (Math.random() - 0.5) * 0.002,
            });
        }
        particlesRef.current = particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            init(window.innerWidth, window.innerHeight);
        };

        resize();
        window.addEventListener("resize", resize);

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            const ps = particlesRef.current;

            for (const p of ps) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -5) p.x = w + 5;
                if (p.x > w + 5) p.x = -5;
                if (p.y < -5) p.y = h + 5;
                if (p.y > h + 5) p.y = -5;

                p.opacity += p.opacityDir;
                if (p.opacity < 0.02 || p.opacity > 0.18) p.opacityDir *= -1;

                // Dark particles for light mode (teal tint)
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(13, 124, 102, ${p.opacity})`;
                ctx.fill();
            }

            // Connections — subtle dark lines
            for (let i = 0; i < ps.length; i++) {
                for (let j = i + 1; j < ps.length; j++) {
                    const dx = ps[i].x - ps[j].x;
                    const dy = ps[i].y - ps[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECT_DIST) {
                        const alpha = (1 - dist / CONNECT_DIST) * 0.04;
                        ctx.beginPath();
                        ctx.moveTo(ps[i].x, ps[i].y);
                        ctx.lineTo(ps[j].x, ps[j].y);
                        ctx.strokeStyle = `rgba(13, 124, 102, ${alpha})`;
                        ctx.lineWidth = 0.4;
                        ctx.stroke();
                    }
                }
            }

            animRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animRef.current);
        };
    }, [init]);

    return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
