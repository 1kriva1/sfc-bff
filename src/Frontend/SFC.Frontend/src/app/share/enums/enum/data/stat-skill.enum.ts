export const StatSkillNames = [
  "Physical",
  "Mental",
  "Skill"
] as const;

type StatSkillName = typeof StatSkillNames[number];

export type StatSkillRecord = Record<StatSkillName, number>;