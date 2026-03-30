"use client";

import { motion, type Variants } from "framer-motion";

import { pricingList } from "./pricing-list";
import PricingCard from "./PricingCard";
import MainWrapper from "@/components/shared/ui/MainWrapper";
import SectionTitle from "@/components/shared/ui/SectionTitle";

// 🔥 sistema global de animaciones
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <MainWrapper>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Título */}
          <motion.div variants={item}>
            <SectionTitle
              subtitle="Simple, transparent pricing"
              title="Pricing"
              description="1 image = 1 generation. No subscriptions, no hidden fees."
            />
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={container}
            className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3"
          >
            {pricingList.map((plan) => (
              <motion.div key={plan.id} variants={item}>
                <PricingCard
                  plan={plan.plan}
                  icon={plan.icon}
                  price={plan.price}
                  features={plan.features}
                  ctaLabel={plan.ctaLabel}
                  iconColor={plan.iconColor}
                  variant={plan.plan === "PRO" ? "default" : "outline"}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </MainWrapper>
    </section>
  );
}

export default Pricing;
