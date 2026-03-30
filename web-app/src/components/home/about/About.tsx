"use client";

import { motion, type Variants } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import MainWrapper from "@/components/shared/ui/MainWrapper";
import SectionTitle from "@/components/shared/ui/SectionTitle";

const points = [
  {
    title: "Powerful AI Models",
    desc: "Generate high-quality images using advanced and specialized models.",
  },
  {
    title: "Built for Creators",
    desc: "From designers to indie creators, everything is optimized for speed and creativity.",
  },
  {
    title: "Full Control",
    desc: "Adjust prompts, styles, aspect ratios and fine-tune every generation.",
  },
];

// 🔥 Sistema de animación idéntico a Features
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function About() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden border-y bg-card"
    >
      {/* Glow background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.12),transparent_70%)]" />

      <MainWrapper className="max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Title */}
          <motion.div variants={item}>
            <SectionTitle
              subtitle="Why choose us"
              title={`Why ${siteConfig.title}`}
              description="Create stunning visuals in seconds using powerful AI tools designed for speed, quality, and control."
            />
          </motion.div>

          {/* Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {points.map((point, i) => (
              <motion.div key={i} variants={item}>
                <div className="group rounded-2xl border bg-card/60 backdrop-blur-xl p-6 hover:border-primary/50 transition">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </MainWrapper>
    </section>
  );
}

export default About;
