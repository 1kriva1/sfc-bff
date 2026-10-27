export const SchemeTypeNames = [
  "Formation",
  "Custom"
] as const;

type SchemeTypeName = typeof SchemeTypeNames[number];

export type SchemeTypeRecord = Record<SchemeTypeName, number>;