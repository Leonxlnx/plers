"use client";

import { useEffect, useState } from "react";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 md:px-20 transition-all duration-500 ${scrolled ? "py-4 bg-black/60 backdrop-blur-md border-b border-white/5" : "py-8 bg-transparent"
                }`}
        >
            {/* Brand (Minimal) - Left */}
            <a href="/" className="font-display text-xl font-bold uppercase tracking-widest text-white hover:text-[#C8FF00] transition-colors group">
                PLERS<span className="text-[#C8FF00] group-hover:text-white transition-colors">.</span>
            </a>

            {/* Nav Links (Right Side) */}
            <div className="flex items-center gap-12">
                <ul className="hidden md:flex items-center gap-10 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
                    <li><a href="#lab" className="hover:text-[#C8FF00] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C8FF00] hover:after:w-full after:transition-all">Lab</a></li>
                    <li><a href="#ethics" className="hover:text-[#C8FF00] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C8FF00] hover:after:w-full after:transition-all">Ethics</a></li>
                    <li><a href="#journal" className="hover:text-[#C8FF00] transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#C8FF00] hover:after:w-full after:transition-all">Journal</a></li>
                </ul>

                {/* Action Button */}
                <button className="hidden md:block px-6 py-2.5 border border-white/20 rounded-full text-[11px] font-sans uppercase tracking-widest text-white hover:bg-[#C8FF00] hover:text-black hover:border-[#C8FF00] transition-all duration-300 transform hover:scale-105">
                    Contact
                </button>

                {/* Mobile Menu Icon */}
                <div className="md:hidden text-white cursor-pointer hover:text-[#C8FF00] transition-colors text-xl">● ● ●</div>
            </div>
        </nav>
    );
}
