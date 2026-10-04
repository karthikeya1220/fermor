import { Analysis } from "@/components/analysis";
import { Ask } from "@/components/ask";
import { Calculators } from "@/components/calculators";
import { Chapters } from "@/components/chapters";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Statement } from "@/components/statement";
import { Trust } from "@/components/trust";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Chapters />
        <Ask />
        <Calculators />
        <Analysis />
        <Trust />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
