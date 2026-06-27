import Link from "next/link";
import { ReactNode } from "react";
import Hero from "@/components/Hero";
import PizzaCard from "@/components/PizzaCard";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import AnimatedNumber from "@/components/AnimatedNumber";
import { IconArrowRight, IconChefHat, IconFlame, IconHeart, IconLeaf, IconPizza } from "@/components/Icons";
import { pizzas } from "@/lib/menu";

export default function HomePage() {
  const featured = pizzas.filter((p) => p.tag);

  return (
    <>
      <Hero />
      <section className="px-6 py-10 md:py-16">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-surface/90 px-6 py-10 shadow-card backdrop-blur-md ring-1 ring-line md:px-10 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary">
                Now open in Galle
              </p>
              <h2 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
                Fresh, modern pizza made for today.
              </h2>
              <p className="mt-5 max-w-xl text-base text-ink-muted md:text-lg">
                Our new shop brings crisp flavors, fast pickup, and bold seasonal
                combinations to the heart of the city. Every pie is crafted to
                feel modern, bright, and unmistakably delicious.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/menu"
                  className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 hover:bg-primary-dark"
                >
                  Explore the menu
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-bg-soft"
                >
                  Visit the shop
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-bg-soft p-6 text-center shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-ink-muted">
                  Crafted daily
                </p>
                <p className="mt-4 text-2xl font-semibold text-ink">New kitchen every day</p>
              </div>
              <div className="rounded-3xl bg-bg-soft p-6 text-center shadow-card">
                <p className="text-sm uppercase tracking-[0.35em] text-ink-muted">
                  Fast order
                </p>
                <p className="mt-4 text-2xl font-semibold text-ink">Pickup in under 20m</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                Fresh picks
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
                Chef-curated favorites
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {featured.map((pizza, i) => (
              <Reveal key={pizza.id} delay={i * 100}>
                <PizzaCard pizza={pizza} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-bg-soft"
            >
              See the full menu
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-bg-soft px-6 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary animate-floatSoft">
              <IconChefHat className="h-8 w-8" />
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold text-ink md:text-4xl">
              Ten Years, one oven.
            </h2>
            <p className="mt-4 max-w-md text-ink-muted">
              Every base is proofed for 48 hours, every tomato comes from San
              Marzano, and every pizza is fired by hand in our 900°F oven —
              the same way it&apos;s been done since day one.
            </p>
            <Link
              href="/about"
              className="group mt-6 inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-dark"
            >
              Read our story
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={<IconPizza className="h-5 w-5" />}>
                <AnimatedNumber value={30} suffix="+" />
                <StatLabel>Years experience</StatLabel>
              </StatCard>
              <StatCard icon={<IconHeart className="h-5 w-5" />}>
                <AnimatedNumber value={500} suffix="k+" />
                <StatLabel>Happy customers</StatLabel>
              </StatCard>
              <StatCard icon={<IconLeaf className="h-5 w-5" />}>
                <AnimatedNumber value={100} suffix="%" />
                <StatLabel>Fresh ingredients</StatLabel>
              </StatCard>
              <StatCard icon={<IconFlame className="h-5 w-5" />}>
                <AnimatedNumber value={900} suffix="°F" />
                <StatLabel>Wood-fire heat</StatLabel>
              </StatCard>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-surface px-8 py-16 text-center shadow-card">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">
            Ready for a new favorite?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-muted">
            Order online for pickup or delivery from our fresh new location,
            or stop by the shop to taste the modern menu in person.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-warm transition-transform hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Order now
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-bg-soft"
            >
              Visit the shop
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function StatCard({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-line bg-surface p-6 text-center shadow-card transition-transform duration-300 hover:-translate-y-1">
      <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <div className="mt-2.5 font-display text-2xl font-semibold text-primary">
        {children}
      </div>
    </div>
  );
}

function StatLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-1 text-xs uppercase tracking-wide text-ink-muted">
      {children}
    </div>
  );
}
