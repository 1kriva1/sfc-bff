import { IEnumModel } from "@share/models";
import { IBadgeTypeEnumModel } from "../../../models/enum/badge-type-enum.model";
import { IFormationEnumModel } from "../../../models/enum/formation-enum.model";
import { IFormationPositionEnumModel } from "../../../models/enum/formation-position-enum.model";
import { IStatTypeEnumModel } from "../../../models/enum/stat-type-enum.model";

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
    gameTeamStatuses: IEnumModel<number>[];
    gameTeamIndexes: IEnumModel<number>[];
    gamePlayerStatuses: IEnumModel<number>[];
    teamStatuses: IEnumModel<number>[];    
    inviteStatuses: IEnumModel<number>[];
    requestStatuses: IEnumModel<number>[];
    teamPlayerStatuses: IEnumModel<number>[];
    formations: IFormationEnumModel[];
    formationPositions: IFormationPositionEnumModel[];
    formationType: IEnumModel<number>[];
}