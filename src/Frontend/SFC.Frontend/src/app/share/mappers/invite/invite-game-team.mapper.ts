
import { EnumService, IInviteGameTeamServiceModel } from "@share/services";
import { mapTeamModel } from "../team/general/team.mapper";
import { mapGameModel } from "../game/general/game.mapper";
import { IInviteGameTeamModel } from "@share/models/invite/invite-game-team.model";

export function mapInviteGameTeamModel(model: IInviteGameTeamServiceModel, enumService: EnumService): IInviteGameTeamModel {
    return {
        id: model.Id,
        status: model.Status,
        teamComment: model.TeamComment,
        gameComment: model.GameComment,
        game: mapGameModel(model.Game, enumService),        
        team: mapTeamModel(model.Team, enumService)
    };
}