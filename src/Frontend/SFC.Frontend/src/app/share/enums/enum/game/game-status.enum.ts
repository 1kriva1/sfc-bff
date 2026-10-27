export const GameStatusNames = [
  "New",
  "Upcoming",
  "Active",
  "Finished",
  "Canceled"
] as const;

type GameStatusName = typeof GameStatusNames[number];

export type GameStatusRecord = Record<GameStatusName, number>;