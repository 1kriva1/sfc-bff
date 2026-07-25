
import { EnumService } from "@share/services";
import { mapTeamModel } from "../team/general/team.mapper";
import { mapGameModel } from "../game/general/game.mapper";
import { IRequestGameTeamModel } from "@share/models";
import { IRequestGameTeamServiceModel } from "@share/services/request/game";

export function mapRequestGameTeamModel(model: IRequestGameTeamServiceModel, enumService: EnumService): IRequestGameTeamModel {
    return {
        id: model.Id,
        status: model.Status,
        teamComment: model.TeamComment,
        gameComment: model.GameComment,
        game: mapGameModel(model.Game, enumService),        
        team: mapTeamModel(model.Team, enumService)
    };
}