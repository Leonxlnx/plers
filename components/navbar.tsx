"use client";

import { useEffect, useState } from "react";

export function Navbar() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => setVisible(true), 200);
    }, []);

    return (
        <nav
            className="nav"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-6px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            <a href="/" className="nav-logo">
                <span className="nav-dot" />
                plers
            </a>

            <ul className="nav-links">
                {["Research", "Platform", "About", "Contact"].map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="nav-link">{item}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
