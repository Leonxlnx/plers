"use client";

import { useEffect, useState } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <a href="/" className="nav-logo">
                <span className="logo-dot" />
                <span>plers</span>
            </a>

            <ul className="nav-links">
                <li><a href="#research" className="nav-link">Forschung</a></li>
                <li><a href="#technology" className="nav-link">Technologie</a></li>
                <li><a href="#about" className="nav-link">Über uns</a></li>
                <li><a href="#careers" className="nav-link">Karriere</a></li>
            </ul>

            <a href="#contact" className="nav-cta">
                Kontakt
            </a>
        </nav>
    );
}
