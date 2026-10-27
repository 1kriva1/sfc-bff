export const StatCategoryNames = [
  "Pace",
  "Shooting",
  "Passing",
  "Dribbling",
  "Defending",
  "Physicality"
] as const;

type StatCategoryName = typeof StatCategoryNames[number];

export type StatCategoryRecord = Record<StatCategoryName, number>;