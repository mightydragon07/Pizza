import type { Metadata } from "next";
import MenuExplorer from "@/components/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu — Orca Pizza",
  description:
    "Browse our signature wood-fired pizzas: classics, specialty pies, and vegetarian options.",
};

export default function MenuPage() {
  return <MenuExplorer />;
}
