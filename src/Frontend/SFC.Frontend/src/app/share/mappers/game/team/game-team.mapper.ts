import { EnumService, IGameTeamServiceModel } from "@share/services";
import { IGameTeamModel } from "@share/models/game/team/game-team.model";
import { mapTeamModel } from "@share/mappers/team/general/team.mapper";

export function mapGameTeamModel(model: IGameTeamServiceModel, enumService: EnumService): IGameTeamModel {
    return {
        gameTeam: {
            id: model.Id,
            status: model.Status,
            index: model.Index,
            team: model.Team ? mapTeamModel(model.Team, enumService) : null!
        }
    };
}