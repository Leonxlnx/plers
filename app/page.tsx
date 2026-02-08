import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CursorGlow } from "@/components/cursor-glow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <Hero />

      {/* Placeholder for next sections */}
      <section
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-dim)",
          }}
        >
          // Weitere Sektionen folgen
        </p>
      </section>
    </>
  );
}
