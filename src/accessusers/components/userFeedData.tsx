// src/accessusers/userFeedData.tsx

export const CANTONES: string[] = [
  "Liberia",
  "Nicoya",
  "Santa Cruz",
  "Cañas",
  "Bagaces",
  "Tilarán",
  "Hojancha",
  "Nandayure",
  "Carrillo",
  "La Cruz",
];

export const CATEGORIES: string[] = [
  "Artistas Locales",
  "Escritores",
  "Músicos",
  "Solistas",
  "Eventos",
  "Grupos de Baile",
];

export const FEED_DATA = Array.from({ length: 36 }).map((_, i) => ({
  id: `item-${i + 1}`,
  name: `Elemento ${i + 1}`,
  canton: CANTONES[i % CANTONES.length],
  category: CATEGORIES[i % CATEGORIES.length],
  description:
    "Descripción breve del elemento con enfoque cultural guanacasteco. Información mock para la fase inicial de UI.",
  image: `https://picsum.photos/seed/guana-${i}/640/420`,
  references: [
    { label: "Referencia 1", url: "https://es.wikipedia.org/wiki/Guanacaste" },
    { label: "Referencia 2", url: "https://www.museosdecostarica.go.cr/" },
  ],
}));
