import { IconFlame } from "./Icons";

const items = [
  "Wood-fired at 900°F",
  "48-hour proofed dough",
  "Imported Italian ingredients",
  "Hand-stretched daily",
  "Open day and night",
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-soft py-4">
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-ink-muted"
          >
            <IconFlame className="h-4 w-4 text-primary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
