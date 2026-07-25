import { IGameModel } from "@share/models/game";
import { IPlayerModel } from "@share/models/player";
import { ITeamModel } from "@share/models/team";
import { IFormationPositionEnumModel } from "@share/services/enum/models/enum/formation-position-enum.model";
import { empty } from "ngx-sfc-common";

export interface ISchemeGameTeamFormationPlayerPositionModel {
    index: number;
    formationPosition: IFormationPositionEnumModel;
    x?: number | empty;
    y?: number | empty;
}

export interface ISchemeGameTeamFormationPlayerModel {
    player: IPlayerModel | empty;
    position: ISchemeGameTeamFormationPlayerPositionModel;
}

export interface ISchemeGameTeamFormationModel {
    formationId: number;
    typeId: number;
    players: ISchemeGameTeamFormationPlayerModel[];
}

export interface ISchemeGameTeamGeneralProfileModel {
    name: string;
    comment: string | empty;
}

export interface ISchemeGameTeamProfileModel {
    general: ISchemeGameTeamGeneralProfileModel;
}

export interface ISchemeGameTeamModel {
    id: number;
    team: ITeamModel;
    game: IGameModel;
    profile: ISchemeGameTeamProfileModel;
    formation: ISchemeGameTeamFormationModel;
}