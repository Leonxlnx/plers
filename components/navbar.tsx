"use client";

export function Navbar() {
    return (
        <nav className="nav-card" style={{ opacity: 0, transform: "translateY(-6px)" }}>
            <a href="/" className="nav-brand">
                PLERS<span className="dot">.</span>
            </a>

            <div className="nav-divider" />

            <div className="nav-links-group">
                <a href="#research" className="nav-link">Research</a>
                <a href="#pipeline" className="nav-link">Pipeline</a>
                <a href="#about" className="nav-link">About</a>
            </div>

            <div className="nav-status">
                <div className="status-dot" />
                <span className="status-text">Lab Active</span>
            </div>

            <button className="nav-cta-btn">
                Get in touch
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </nav>
    );
}
