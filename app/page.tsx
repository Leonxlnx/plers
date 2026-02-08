import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Research } from "@/components/research";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Research />
    </main>
  );
}
