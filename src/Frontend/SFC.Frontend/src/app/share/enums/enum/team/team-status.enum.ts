export const TeamStatusNames = [
  "Temporary",
  "Active",
  "Inactive",
  "Closed"
] as const;

type TeamStatusName = typeof TeamStatusNames[number];

export type TeamStatusRecord = Record<TeamStatusName, number>;