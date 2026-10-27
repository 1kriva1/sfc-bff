export const GameStyleNames = [
  "Defend",
  "Attacking",
  "Aggressive",
  "CounterAttacks"
] as const;

type GameStyleName = typeof GameStyleNames[number];

export type GameStyleRecord = Record<GameStyleName, number>;