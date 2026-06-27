"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Pizza } from "@/lib/menu";

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={pizza.image}
          alt={pizza.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {pizza.tag && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white shadow-card"
          >
            {pizza.tag}
          </motion.span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink">
            {pizza.name}
          </h3>
          <span className="whitespace-nowrap font-mono text-base font-semibold text-primary">
            ${pizza.price}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-ink-muted">{pizza.description}</p>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="mt-4 w-full rounded-full bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Add to order
        </motion.button>
      </div>
    </motion.div>
  );
}
