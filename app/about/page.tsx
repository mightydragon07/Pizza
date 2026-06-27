import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { IconFlame, IconUsers, IconWheat } from "@/components/Icons";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About — Orca Pizza",
  description:
    "Thirty years of wood-fired pizza craft, traditional methods, and ingredients imported from Italy.",
};

const timeline = [
  {
    year: "2014",
    title: "The first oven is lit",
    text: "A single wood oven, a family recipe, and a corner kitchen — Orca Pizza opens its doors.",
  },
  {
    year: "2017",
    title: "Italian sourcing begins",
    text: "We start importing San Marzano tomatoes and fior di latte directly from Campania.",
  },
  {
    year: "2019",
    title: "The dough room",
    text: "We move to a 48-hour cold proof, giving every base its signature lightness and char.",
  },
  {
    year: "2026",
    title: "Day and night, fresh out the fire",
    text: "Now serving from morning light through late embers, with the same care every time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="px-6 pb-12 pt-16 md:pt-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Our story
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Thirty years at the mouth of the oven
          </h1>
          <p className="mt-5 text-ink-muted">
            Orca Pizza has been crafting authentic Italian pizza using
            traditional methods and the finest ingredients imported directly
            from Italy — one pie, one fire, one family recipe at a time.
          </p>
        </Reveal>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <ol className="relative space-y-10 border-l border-line pl-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 100}>
                <li className="relative">
                  <span className="absolute -left-[39px] top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-bg" />
                  <span className="font-mono text-sm font-semibold text-primary">
                    {item.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-ink-muted">{item.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-bg-soft px-6 py-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          <ValueCard
            icon={<IconWheat className="h-6 w-6" />}
            title="Imported ingredients"
            text="Flour, tomatoes, and cheese sourced directly from Italian producers."
          />
          <ValueCard
            icon={<IconFlame className="h-6 w-6 animate-flicker" />}
            title="True wood fire"
            text="A 900°F oven gives every base its leopard-spotted char in under two minutes."
          />
          <ValueCard
            icon={<IconUsers className="h-6 w-6" />}
            title="Family-run"
            text="Three decades, one family, the same recipe passed down at every shift."
          />
        </div>
      </section>
    </>
  );
}

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Reveal className="group rounded-2xl border border-line bg-surface p-7 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">{text}</p>
    </Reveal>
  );
}
