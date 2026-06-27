export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "classic" | "specialty" | "veg";
  tag?: string;
}

export const pizzas: Pizza[] = [
  {
    id: "margherita",
    name: "Margherita Classic",
    description: "San Marzano tomatoes, fior di latte, basil, olive oil",
    price: 18,
    image: "/placeholder-pizza-1.svg",
    category: "classic",
    tag: "Most loved",
  },
  {
    id: "pepperoni",
    name: "Pepperoni Supreme",
    description: "Premium pepperoni, mozzarella, oregano, chili oil",
    price: 22,
    image: "/placeholder-pizza-2.svg",
    category: "classic",
  },
  {
    id: "truffle",
    name: "Truffle Deluxe",
    description: "Black truffle, wild mushrooms, arugula, parmesan",
    price: 28,
    image: "/placeholder-pizza-3.svg",
    category: "specialty",
    tag: "Chef's pick",
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, fontina, parmesan",
    price: 24,
    image: "/placeholder-pizza-1.svg",
    category: "specialty",
  },
  {
    id: "veggie",
    name: "Garden Veggie",
    description: "Roasted peppers, courgette, red onion, herb oil",
    price: 20,
    image: "/placeholder-pizza-2.svg",
    category: "veg",
  },
  {
    id: "meat",
    name: "Meat Lovers",
    description: "Pepperoni, sausage, smoked bacon, prosciutto",
    price: 26,
    image: "/placeholder-pizza-3.svg",
    category: "classic",
  },
];

export const categories: { id: Pizza["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "classic", label: "Classic" },
  { id: "specialty", label: "Specialty" },
  { id: "veg", label: "Vegetarian" },
];
