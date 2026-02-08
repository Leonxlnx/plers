"use client";

import { useEffect, useState } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className={`nav${scrolled ? " scrolled" : ""}`}>
            <a href="/" className="nav-brand">
                PLERS<span className="dot">.</span>
            </a>

            <ul className="nav-items">
                <li><a href="#lab">Lab</a></li>
                <li><a href="#ethics">Ethics</a></li>
                <li><a href="#journal">Journal</a></li>
                <li><button className="nav-contact">Contact</button></li>
            </ul>
        </nav>
    );
}
