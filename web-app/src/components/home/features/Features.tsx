"use client";

import MainWrapper from "@/components/shared/ui/MainWrapper";
import SectionTitle from "@/components/shared/ui/SectionTitle";
import { featuresList } from "@/components/home/features/features-list.data";
import FeatureItem from "@/components/home/features/FeatureItem";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

function Features() {
  // 🔥 MISMO sistema que Hero
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

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.15),transparent_70%)]" />

      <MainWrapper>
        {/* 👇 También puedes animar el título si quieres consistencia total */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={item}>
            <SectionTitle
              title="Features"
              subtitle="Powerful. Flexible. Scalable."
              description="Everything you need to generate, customize, and scale high-quality AI images"
            />
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuresList.map((feature, i) => (
              <motion.div key={i} variants={item}>
                <FeatureItem
                  title={feature.title}
                  description={feature.desc}
                  icon={feature.icon}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </MainWrapper>
    </section>
  );
}

export default Features;
