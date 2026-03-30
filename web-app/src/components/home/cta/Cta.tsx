"use client";

import MainWrapper from "@/components/shared/ui/MainWrapper";
import SectionTitle from "@/components/shared/ui/SectionTitle";
import { Button, buttonVariants } from "@/components/ui/button";
import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

// 🔥 sistema global igual que Features/Faq
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
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Cta() {
  return (
    <section className="py-20">
      <MainWrapper className="bg-card rounded-2xl border p-8 text-center sm:p-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Title */}
          <motion.div variants={item}>
            <SectionTitle
              title="Start Generating Images Today"
              subtitle="Powerful. Fast. Easy."
              description="Turn your ideas into stunning visuals with our AI-powered image generation tools."
            />
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={item} className="mt-2">
            <Link href="/auth/sign-up">
              <Button size="lg" className="cursor-pointer gap-2 px-8 py-6">
                <Sparkles className="size-5" />
                <span className="font-bold">Try It Free Now</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </MainWrapper>
    </section>
  );
}

export default Cta;
