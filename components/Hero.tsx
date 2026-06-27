"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";
import { IconPizza } from "./Icons";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      {/* Soft floating accent shapes */}
      <span className="pointer-events-none absolute left-[8%] top-[18%] h-24 w-24 rounded-full bg-accent/10 blur-2xl animate-floatSoft" />
      <span className="pointer-events-none absolute right-[12%] top-[55%] h-32 w-32 rounded-full bg-primary/10 blur-2xl animate-floatSoft [animation-delay:1.2s]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-5xl text-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-soft px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-ink-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Now open in Galle
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 font-display text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-ink md:text-7xl"
        >
          Modern pizza
          <br />
          <span className="italic text-primary">crafted for today.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink-muted"
        >
          Bright ingredients, bold flavor, and fast pickup from our brand new
          kitchen. Order online or drop by to experience the freshest pizza in
          town.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/menu"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-primary-dark"
          >
            View the menu
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bg-soft"
          >
            Visit us
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        transition={{ delay: 0.45 }}
        className="relative mt-16"
      >
        <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/60 py-6 backdrop-blur-sm">
          <Stat>
            <AnimatedNumber value={30} suffix="+" />
            <StatLabel>Years of craft</StatLabel>
          </Stat>
          <Stat>
            <AnimatedNumber value={500} suffix="k+" />
            <StatLabel>Pizzas served</StatLabel>
          </Stat>
          <Stat>
            <AnimatedNumber value={900} suffix="°F" />
            <StatLabel>Oven heat</StatLabel>
          </Stat>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center font-display text-2xl font-semibold text-primary md:text-3xl">
      {children}
    </div>
  );
}

function StatLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-1 text-xs font-sans font-normal uppercase tracking-wide text-ink-muted">
      {children}
    </div>
  );
}
