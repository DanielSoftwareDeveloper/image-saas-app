"use client";

import MainWrapper from "@/components/shared/ui/MainWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { easeInOut } from "framer-motion";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  const handleClick = () => {
    const el = document.getElementById("demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    router.replace(window.location.pathname);
  };

  // 🔥 Animaciones consistentes
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeInOut,
      },
    },
  };

  return (
    <section
      id="banner"
      className="relative h-144 md:h-168 lg:h-screen overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0.5, scale: 1.1 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.3, scale: 1 }}
          animate={{ opacity: 0.5, scale: 1.15 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-chart-2/20 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-150 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <MainWrapper className="-mt-12 flex h-full flex-col items-center justify-center max-w-187.5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8 text-center"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Powered by Advanced AI Models
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance"
          >
            <span className="text-foreground">Advanced AI</span>
            <br />
            <span className="bg-linear-to-r from-primary via-emerald to-primary bg-clip-text text-transparent">
              Image Generation
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty"
          >
            Generate high-quality images from text prompts in seconds. Iterate
            quickly, refine your results, and build your own image library.
          </motion.p>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {/* Botón principal */}
              <Link href="/auth/sign-up">
                <Button size="lg" className="cursor-pointer gap-2 px-8 py-6">
                  <Sparkles className="size-5" />
                  <span className="font-bold">Start creating</span>
                </Button>
              </Link>

              {/* Botón secundario outline */}

              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer gap-2 px-8 py-6"
                onClick={handleClick}
              >
                <span className="font-bold">See Examples</span>
              </Button>
            </div>

            <span className="text-sm text-muted-foreground">
              No credit card required
            </span>
          </div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "10M+", label: "Images Created" },
              { value: "50K+", label: "Active Creators" },
              { value: "99.9%", label: "Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </MainWrapper>
    </section>
  );
}

export default Hero;
