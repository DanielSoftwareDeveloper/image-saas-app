"use client";

import MainWrapper from "@/components/shared/ui/MainWrapper";
import SectionTitle from "@/components/shared/ui/SectionTitle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, type Variants } from "framer-motion";

// 🔥 mismo sistema global que Features
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

const faqs = [
  {
    value: "item-1",
    question: "What is this platform for?",
    answer:
      "Generate high-quality images from text prompts using powerful AI models.",
  },
  {
    value: "item-2",
    question: "What AI models do you use?",
    answer:
      "We use advanced models including Stable Diffusion and custom fine-tuned models.",
  },
  {
    value: "item-3",
    question: "Can I use the generated images commercially?",
    answer: "Yes, PRO users get full commercial rights.",
  },
  {
    value: "item-4",
    question: "How long does it take?",
    answer: "Most images are generated in seconds.",
  },
  {
    value: "item-5",
    question: "Can I customize outputs?",
    answer: "Yes, you can control prompts, styles, and aspect ratios.",
  },
];

function Faq() {
  return (
    <section id="faq" className="bg-card border-y py-24">
      <MainWrapper className="max-w-3xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Title */}
          <motion.div variants={item}>
            <SectionTitle
              title="FAQ"
              subtitle="Frequently asked questions"
              description="Everything you need to know about the platform."
            />
          </motion.div>

          {/* Accordion */}
          <Accordion
            type="single"
            collapsible
            className="mt-12 rounded-2xl border bg-card/60 backdrop-blur p-6"
          >
            {faqs.map((faq) => (
              <motion.div key={faq.value} variants={item}>
                <AccordionItem value={faq.value}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </MainWrapper>
    </section>
  );
}

export default Faq;
