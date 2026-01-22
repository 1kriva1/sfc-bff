import { IFormationPositionEnumModel } from "@share/services/enum/models/enum/formation-position-enum.model";
import { empty } from "ngx-sfc-common";
import { IPlayerModel } from "../player/player.model";
import { ITeamModel } from "../team/general/team.model";

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