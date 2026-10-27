export const GameTeamIndexNames = [
  "A",
  "B"
] as const;

type GameTeamIndexName = typeof GameTeamIndexNames[number];

export type GameTeamIndexRecord = Record<GameTeamIndexName, number>;