"use client";

import SectionTitle from "@/components/shared/ui/SectionTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, WandSparklesIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import MainWrapper from "@/components/shared/ui/MainWrapper";

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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function Demo() {
  const examples = [
    {
      title: "Realistic Photo",
      prompt:
        "A close-up portrait of a beautiful Asian woman, natural light, long flowing hair, elegant jewelry",
      tag: "portrait",
      imageSrc: "/demo/asian-girl.png",
    },
    {
      title: "Isometric City",
      prompt:
        "An isometric futuristic city at sunset, neon signage, ultra-detailed, clean lines",
      tag: "isometric",
      imageSrc: "/demo/isometric-city.png",
    },
    {
      title: "Product Shot",
      prompt:
        "A premium product photo of a sleek water bottle on a marble surface, studio lighting, crisp reflections",
      tag: "product",
      imageSrc: "/demo/product-shot.png",
    },
  ];

  return (
    <section
      className="relative border-y bg-card py-24 overflow-hidden"
      id="demo"
    >
      {/* glow fondo */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.12),transparent_70%)]" />

      <MainWrapper>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Title */}
          <motion.div variants={item}>
            <SectionTitle
              title="Examples"
              subtitle="What can you create?"
              description="A few prompt ideas to get you started."
            />
          </motion.div>

          {/* Cards */}
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {examples.map((ex) => (
              <motion.div key={ex.tag} variants={item}>
                <Card className="group relative overflow-hidden bg-card/60 backdrop-blur-xl hover:border-primary/50 transition-all">
                  <div className="px-6">
                    {/* header */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
                          <WandSparklesIcon className="size-5 text-black" />
                        </div>
                        <div className="font-semibold">{ex.title}</div>
                      </div>

                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {ex.tag}
                      </span>
                    </div>

                    {/* image */}
                    <div className="mb-4 overflow-hidden rounded-xl border">
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                          src={ex.imageSrc}
                          alt={`${ex.title} example`}
                          fill
                          unoptimized
                          className="object-contain group-hover:scale-105 transition duration-500"
                        />
                      </div>
                    </div>

                    {/* prompt */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      &ldquo;{ex.prompt}&rdquo;
                    </p>
                  </div>

                  {/* hover glow */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-linear-to-br from-primary/10 to-transparent" />
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={item} className="text-center mt-2">
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

export default Demo;
