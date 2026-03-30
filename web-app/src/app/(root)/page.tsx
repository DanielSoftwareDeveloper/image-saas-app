import Hero from "@/components/home/hero/Hero";
import Demo from "@/components/home/demo/Demo";
import Features from "@/components/home/features/Features";
import About from "@/components/home/about/About";
import Pricing from "@/components/home/pricing/Pricing";
import Faq from "@/components/home/faq/Faq";
import Cta from "@/components/home/cta/Cta";

export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <main>
        <Hero />
        <Demo />
        <Features />
        <About />
        <Pricing />
        <Faq />
        <Cta />
      </main>
    </div>
  );
}
