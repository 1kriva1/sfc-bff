export const GameTeamStatusNames = [
  "InGame",
  "OutOfGame"
] as const;

type GameTeamStatusName = typeof GameTeamStatusNames[number];

export type GameTeamStatusRecord = Record<GameTeamStatusName, number>;