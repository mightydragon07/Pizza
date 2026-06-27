import Link from "next/link";
import { IconPizza } from "./Icons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-bg-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <IconPizza className="h-5 w-5 animate-spin-slower" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-ink">
                Orca Pizza
              </p>
              <p className="text-sm text-ink-muted">
                New in town with bright, modern pizza made for today.
              </p>
            </div>
          </div>
        </div>

        <div>
          <FooterColumn
            title="Explore"
            links={[
              { href: "/", label: "Home" },
              { href: "/menu", label: "Menu" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ]}
          />
        </div>

        <div className="grid gap-6">
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Hours
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              <li>Mon – Thu: 11am – 10pm</li>
              <li>Fri – Sun: 11am – 11pm</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
              Contact
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
              <li>123 Pizza Street, Cross Road, Galle</li>
              <li>(123) 123-PIZZA</li>
              <li>hello@orcapizza.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-line px-6 py-5 text-center text-xs text-ink-muted">
        © {new Date().getFullYear()} Orca Pizza. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-ink">
        {title}
      </h4>
      <ul className="mt-3 space-y-1.5 text-sm text-ink-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
