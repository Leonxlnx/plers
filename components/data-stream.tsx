"use client";

import { useEffect, useState, useRef } from "react";

function generateLine(): string {
    const chars = "ATCG";
    const hex = "0123456789ABCDEF";

    const type = Math.random();

    if (type < 0.3) {
        // DNA sequence fragment
        return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * 4)]).join("");
    } else if (type < 0.6) {
        // Hex value
        return (
            "0x" +
            Array.from({ length: 4 }, () => hex[Math.floor(Math.random() * 16)]).join("")
        );
    } else if (type < 0.8) {
        // Decimal with unit
        return (Math.random() * 100).toFixed(2) + (Math.random() > 0.5 ? "nm" : "kDa");
    } else {
        // Percentage
        return (Math.random() * 100).toFixed(1) + "%";
    }
}

const LINES = 20;

export function DataStream() {
    const [lines, setLines] = useState<string[]>(() =>
        Array.from({ length: LINES }, generateLine)
    );
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setLines((prev) => {
                const next = [...prev];
                const idx = Math.floor(Math.random() * LINES);
                next[idx] = generateLine();
                return next;
            });
            setActiveIndex(Math.floor(Math.random() * LINES));
        }, 250);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

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
