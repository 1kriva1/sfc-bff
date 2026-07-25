import { IPlayerModel } from "@share/models/player";
import { ITeamModel } from "@share/models/team";
import { IFormationPositionEnumModel } from "@share/services/enum/models/enum/formation-position-enum.model";
import { empty } from "ngx-sfc-common";

export interface ISchemeTeamFormationPlayerPositionModel {
    index: number;
    formationPosition: IFormationPositionEnumModel;
    x?: number | empty;
    y?: number | empty;
}

export interface ISchemeTeamFormationPlayerModel {
    player: IPlayerModel | empty;
    position: ISchemeTeamFormationPlayerPositionModel;
}

export interface ISchemeTeamFormationModel {
    formationId: number;
    typeId: number;
    players: ISchemeTeamFormationPlayerModel[];
}

export interface ISchemeTeamGeneralProfileModel {
    name: string;
    comment: string | empty;
}

export interface ISchemeTeamProfileModel {
    general: ISchemeTeamGeneralProfileModel;
}

export interface ISchemeTeamModel {
    id: number;
    team: ITeamModel;
    profile: ISchemeTeamProfileModel;
    formation: ISchemeTeamFormationModel;
}