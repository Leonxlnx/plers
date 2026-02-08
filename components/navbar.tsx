"use client";

import { useEffect, useState } from "react";

export function Navbar() {
    return (
        <nav className="nav-pill" style={{ transform: "translateY(-8px)" }}>
            <span className="nav-brand">
                PLERS<span className="dot">.</span>
            </span>

            <div className="nav-divider" />

            <a href="#lab" className="nav-link">
                <span className="nav-num">01</span> Lab
            </a>
            <a href="#ethics" className="nav-link">
                <span className="nav-num">02</span> Ethics
            </a>
            <a href="#journal" className="nav-link">
                <span className="nav-num">03</span> Journal
            </a>

            <button className="nav-cta-circle" aria-label="Contact">
                <svg viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </nav>
    );
}
