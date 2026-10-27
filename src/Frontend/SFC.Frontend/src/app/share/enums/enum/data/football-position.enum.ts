export const FootballPositionNames = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward"
] as const;

type FootballPositionName = typeof FootballPositionNames[number];

export type FootballPositionRecord = Record<FootballPositionName, number>;