export const GamePlayerStatusNames = [
  "InGame",
  "OutOfGame"
] as const;

type GamePlayerStatusName = typeof GamePlayerStatusNames[number];

export type GamePlayerStatusRecord = Record<GamePlayerStatusName, number>;