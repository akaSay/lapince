export const CATEGORY_GROUPS = {
  essential: {
    name: "Dépenses essentielles",
    categories: [
      "housing",
      "utilities",
      "groceries",
      "healthcare",
      "insurance",
    ],
  },
  transport: {
    name: "Transport",
    categories: [
      "transport",
      "fuel",
      "parking",
      "publicTransport",
      "maintenance",
    ],
  },
  foodAndDrinks: {
    name: "Alimentation & Sorties",
    categories: ["food", "restaurants", "coffee", "bars"],
  },
  leisureAndCulture: {
    name: "Loisirs & Culture",
    categories: ["leisure", "entertainment", "sports", "travel", "culture"],
  },
  education: {
    name: "Éducation",
    categories: ["education", "training", "books"],
  },
  shopping: {
    name: "Shopping",
    categories: ["shopping", "clothing", "electronics", "gifts"],
  },
  wellness: {
    name: "Bien-être",
    categories: ["wellness", "beauty", "fitness"],
  },
  services: {
    name: "Services & Abonnements",
    categories: ["subscriptions", "internet", "streaming", "software"],
  },
  finances: {
    name: "Finances",
    categories: ["savings", "investments", "taxes", "fees"],
  },
  income: {
    name: "Revenus",
    categories: ["salary", "freelance", "rental", "interests", "other"],
  },
} as const;

export const CATEGORY_ICONS = {
  // Dépenses essentielles
  housing: "home",
  utilities: "bolt",
  groceries: "shopping_cart",
  healthcare: "medical_services",
  insurance: "shield",

  // Transport
  transport: "directions_car",
  fuel: "local_gas_station",
  parking: "local_parking",
  publicTransport: "train",
  maintenance: "build",

  // Alimentation & Sorties
  food: "restaurant",
  restaurants: "restaurant_menu",
  coffee: "coffee",
  bars: "local_bar",

  // Loisirs & Culture
  leisure: "sports_esports",
  entertainment: "movie",
  sports: "sports_soccer",
  travel: "flight",
  culture: "theater_comedy",

  // Éducation
  education: "school",
  training: "cast_for_education",
  books: "menu_book",

  // Shopping
  shopping: "shopping_bag",
  clothing: "checkroom",
  electronics: "devices",
  gifts: "card_giftcard",

  // Bien-être
  wellness: "spa",
  beauty: "face",
  fitness: "fitness_center",

  // Services & Abonnements
  subscriptions: "subscriptions",
  internet: "wifi",
  streaming: "stream",
  software: "computer",

  // Finances
  savings: "savings",
  investments: "trending_up",
  taxes: "receipt_long",
  fees: "account_balance",

  // Revenus
  salary: "work",
  freelance: "business_center",
  rental: "apartment",
  interests: "paid",
  other: "more_horiz",
} as const;
