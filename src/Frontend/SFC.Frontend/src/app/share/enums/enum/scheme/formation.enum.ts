export const FormationNames = [
  "PowerfullAttacking",
  "Control",
  "Defend",
  "Atacking",
  "Balanced",
  "BoxToBox",
  "FakeNine"
] as const;

type FormationName = typeof FormationNames[number];

export type FormationRecord = Record<FormationName, number>;