"use client";

import { useEffect, useState, useRef } from "react";

const LINES = 18;
const PLACEHOLDER = "--------";

function generateLine(): string {
    const chars = "ATCG";
    const hex = "0123456789ABCDEF";
    const type = Math.random();

    if (type < 0.3) {
        return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * 4)]).join("");
    } else if (type < 0.6) {
        return "0x" + Array.from({ length: 4 }, () => hex[Math.floor(Math.random() * 16)]).join("");
    } else if (type < 0.8) {
        return (Math.random() * 100).toFixed(2) + (Math.random() > 0.5 ? "nm" : "kDa");
    } else {
        return (Math.random() * 100).toFixed(1) + "%";
    }
}

export function DataStream() {
    const [lines, setLines] = useState<string[]>(Array(LINES).fill(PLACEHOLDER));
    const [activeIndex, setActiveIndex] = useState(-1);
    const [mounted, setMounted] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setMounted(true);
        setLines(Array.from({ length: LINES }, generateLine));
        setActiveIndex(0);

        intervalRef.current = setInterval(() => {
            setLines((prev) => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * LINES);
                next[idx] = generateLine();
                return next;
            });
            setActiveIndex(Math.floor(Math.random() * LINES));
        }, 300);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    if (!mounted) return null;

    return (
        <div className="data-stream" aria-hidden="true">
            {lines.map((line, i) => (
                <span key={i} className={i === activeIndex ? "active" : ""}>
                    {line}
                </span>
            ))}
        </div>
    );
}
