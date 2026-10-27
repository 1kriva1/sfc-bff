export const FormationPositionNames = [
  "GK",
  "LB",
  "RB",
  "CB",
  "LWB",
  "RWB",
  "LM",
  "RM",
  "CM",
  "CDM",
  "CAM",
  "LF",
  "RF",
  "CF",
  "ST",
  "LW",
  "RW"
] as const;

type FormationPositionName = typeof FormationPositionNames[number];

export type FormationPositionRecord = Record<FormationPositionName, number>;