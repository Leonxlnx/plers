"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = ["Research", "Platform", "About", "Careers"];

export function Navbar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <nav
            className="nav"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-10px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <a href="/" className="nav-logo">
                <span className="nav-dot" />
                plers
            </a>

            <ul className="nav-links">
                {NAV_ITEMS.map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="nav-link">
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
