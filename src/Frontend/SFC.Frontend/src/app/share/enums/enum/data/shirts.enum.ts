export const ShirtNames = [
  "Blue",
  "Pink",
  "Black",
  "Red",
  "Yellow",
  "Purple",
  "Orange",
  "Brown",
  "Green"
] as const;

type ShirtName = typeof ShirtNames[number];

export type ShirtRecord = Record<ShirtName, number>;