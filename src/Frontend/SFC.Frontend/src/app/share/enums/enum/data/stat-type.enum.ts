export const StatTypeNames = [
  "Acceleration",
  "SprintSpeed",
  "Positioning",
  "Finishing",
  "ShotPower",
  "LongShots",
  "Volleys",
  "Penalties",
  "Vision",
  "Crossing",
  "FkAccuracy",
  "ShortPassing",
  "LongPassing",
  "Curve",
  "Agility",
  "Balance",
  "Reactions",
  "BallControl",
  "Dribbling",
  "Composure",
  "Interceptions",
  "HeadingAccuracy",
  "DefAwarenence",
  "StandingTackle",
  "SlidingTackle",
  "Jumping",
  "Stamina",
  "Strength",
  "Aggression"
] as const;

type StatTypeName = typeof StatTypeNames[number];

export type StatTypeRecord = Record<StatTypeName, number>;