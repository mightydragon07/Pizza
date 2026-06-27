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
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=600&fit=crop&crop=center",
    category: "classic",
    tag: "Most loved",
  },
  {
    id: "pepperoni",
    name: "Pepperoni Supreme",
    description: "Premium pepperoni, mozzarella, oregano, chili oil",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=600&fit=crop&crop=center",
    category: "classic",
  },
  {
    id: "truffle",
    name: "Truffle Deluxe",
    description: "Black truffle, wild mushrooms, arugula, parmesan",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=600&h=600&fit=crop&crop=center",
    category: "specialty",
    tag: "Chef's pick",
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, fontina, parmesan",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&h=600&fit=crop&crop=center",
    category: "specialty",
  },
  {
    id: "veggie",
    name: "Garden Veggie",
    description: "Roasted peppers, courgette, red onion, herb oil",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=600&fit=crop&crop=center",
    category: "veg",
  },
  {
    id: "meat",
    name: "Meat Lovers",
    description: "Pepperoni, sausage, smoked bacon, prosciutto",
    price: 26,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=600&fit=crop&crop=center",
    category: "classic",
  },
];

export const categories: { id: Pizza["category"] | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "classic", label: "Classic" },
  { id: "specialty", label: "Specialty" },
  { id: "veg", label: "Vegetarian" },
];
