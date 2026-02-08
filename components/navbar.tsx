"use client";

import { useEffect, useState } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 md:px-20 transition-all duration-500`}>
            {/* Brand (Minimal) */}
            <a href="/" className="font-display text-xl uppercase tracking-widest text-white/90 hover:text-[#C8FF00] transition-colors">
                PLERS<span className="text-[#C8FF00]">.</span> {/* Acid Lime Period */}
            </a>

            {/* Nav Links (Right Side) */}
            <ul className="hidden md:flex items-center gap-12 font-sans text-xs uppercase tracking-[0.2em] text-white/70">
                <li><a href="#lab" className="hover:text-[#C8FF00] transition-colors">Lab</a></li>
                <li><a href="#ethics" className="hover:text-[#C8FF00] transition-colors">Ethics</a></li>
                <li><a href="#journal" className="hover:text-[#C8FF00] transition-colors">Journal</a></li>
                <li>
                    <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-[#C8FF00] hover:text-black hover:border-transparent transition-all duration-300">
                        Contact
                    </button>
                </li>
            </ul>

            {/* Mobile Menu Icon */}
            <div className="md:hidden text-white">● ● ●</div>
        </nav>
    );
}
