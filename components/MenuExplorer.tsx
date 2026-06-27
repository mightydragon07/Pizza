"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PizzaCard from "@/components/PizzaCard";
import Reveal from "@/components/Reveal";
import { pizzas, categories, Pizza } from "@/lib/menu";

export default function MenuExplorer() {
  const [active, setActive] = useState<Pizza["category"] | "all">("all");

  const visible =
    active === "all" ? pizzas : pizzas.filter((p) => p.category === active);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            The full menu
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Our signature pizzas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-ink-muted">
            Every pie starts with 48-hour proofed dough and finishes in our
            wood oven at 900°F, about 90 seconds a bake.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div className="relative flex flex-wrap items-center gap-1 rounded-full border border-line bg-bg-soft p-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`relative z-10 rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  active === cat.id ? "text-white" : "text-ink-muted hover:text-ink"
                }`}
              >
                {active === cat.id && (
                  <motion.span
                    layoutId="menu-pill"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 -z-10 rounded-full bg-primary shadow-card"
                  />
                )}
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((pizza, i) => (
              <motion.div
                key={pizza.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <PizzaCard pizza={pizza} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-ink-muted">
            Nothing in this category yet — check back soon.
          </p>
        )}
      </div>
    </section>
  );
}
