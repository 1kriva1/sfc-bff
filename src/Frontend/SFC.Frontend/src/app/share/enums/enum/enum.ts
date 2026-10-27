import {
    FootballPositionRecord, GameStyleRecord, ShirtRecord,
    StatCategoryRecord, StatSkillRecord, StatTypeRecord, WorkingFootRecord
} from "./data";
import { GamePlayerStatusRecord, GameStatusRecord, GameTeamIndexRecord, GameTeamStatusRecord } from "./game";
import { InviteStatusRecord } from "./invite";
import { RequestStatusRecord } from "./request";
import { FormationPositionRecord, FormationRecord, SchemeTypeRecord } from "./scheme";
import { TeamPlayerStatusRecord, TeamStatusRecord } from "./team";

export interface IEnum {
    readonly FootballPosition: FootballPositionRecord;
    readonly GameStyle: GameStyleRecord;
    readonly Shirt: ShirtRecord;
    readonly StatCategory: StatCategoryRecord;
    readonly StatSkill: StatSkillRecord;
    readonly StatType: StatTypeRecord;
    readonly WorkingFoot: WorkingFootRecord;
    readonly InviteStatus: InviteStatusRecord;
    readonly RequestStatus: RequestStatusRecord;
    readonly GameStatus: GameStatusRecord;
    readonly GamePlayerStatus: GamePlayerStatusRecord;
    readonly GameTeamStatus: GameTeamStatusRecord;
    readonly GameTeamIndex: GameTeamIndexRecord;
    readonly Formation: FormationRecord;
    readonly FormationPosition: FormationPositionRecord;
    readonly SchemeType: SchemeTypeRecord;
    readonly TeamStatus: TeamStatusRecord;
    readonly TeamPlayerStatus: TeamPlayerStatusRecord;
}

let current: IEnum | undefined;

export function setEnums(value: IEnum): void {
    current = Object.freeze(value);
}

export function resetEnums(): void {
    current = undefined;
}

export const Enum: IEnum = new Proxy({} as IEnum, {
    get(_, prop: string) {
        if (!current) {
            throw new Error(`Enums.${prop} was read before EnumService.load() finished.`);
        }
        return current[prop as keyof IEnum];
    }
});