export const languages = {
  uz: { name: "O'zbekcha", flag: "🇺🇿" },
  ru: { name: "Русский", flag: "🇷🇺" },
  cy: { name: "Ўзбекча", flag: "🇺🇿" }
} as const;

export type Language = keyof typeof languages;
