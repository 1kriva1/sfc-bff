export const WorkingFootNames = [
  "Right",
  "Left",
  "Both"
] as const;

type WorkingFootName = typeof WorkingFootNames[number];

export type WorkingFootRecord = Record<WorkingFootName, number>;