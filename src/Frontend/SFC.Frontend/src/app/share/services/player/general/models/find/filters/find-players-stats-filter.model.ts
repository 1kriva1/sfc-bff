import { ILimitSearchModel } from "@core/models";
import { IStatSkillLimitSearchModel } from "./stat-skill-limit-search.model";

export interface IFindPlayersStatsFilterModel {
    Total: ILimitSearchModel<number> | null;
    Raiting: number | null;
    Mental: IStatSkillLimitSearchModel;
    Physical: IStatSkillLimitSearchModel;
    Skill: IStatSkillLimitSearchModel;
}