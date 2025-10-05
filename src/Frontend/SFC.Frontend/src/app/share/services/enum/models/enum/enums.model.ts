import { IEnumModel } from "@core/types";
import { IBadgeTypeEnumModel } from "./badge-type-enum.model";
import { IFormationEnumModel } from "./formation-enum.model";
import { IFormationPositionEnumModel } from "./formation-position-enum.model";
import { IStatTypeEnumModel } from "./stat-type-enum.model";

export interface IEnumsModel {
    footballPositions: IEnumModel<number>[];
    gameStyles: IEnumModel<number>[];
    statCategories: IEnumModel<number>[];
    statSkills: IEnumModel<number>[];
    statTypes: IStatTypeEnumModel[];
    workingFoots: IEnumModel<number>[];
    shirts: IEnumModel<number>[];
    badgeTypes: IBadgeTypeEnumModel[];
    gameStatuses: IEnumModel<number>[];
    teamStatuses: IEnumModel<number>[];    
    inviteStatuses: IEnumModel<number>[];
    requestStatuses: IEnumModel<number>[];
    teamPlayerStatuses: IEnumModel<number>[];
    formations: IFormationEnumModel[];
    formationPositions: IFormationPositionEnumModel[];
    formationType: IEnumModel<number>[];
}