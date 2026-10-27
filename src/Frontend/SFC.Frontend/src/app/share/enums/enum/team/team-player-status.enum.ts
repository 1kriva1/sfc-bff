export const TeamPlayerStatusNames = [
  "Active",
  "Injured",
  "Retired",
  "Unavailable",
  "Removed"
] as const;

type TeamPlayerStatusName = typeof TeamPlayerStatusNames[number];

export type TeamPlayerStatusRecord = Record<TeamPlayerStatusName, number>;