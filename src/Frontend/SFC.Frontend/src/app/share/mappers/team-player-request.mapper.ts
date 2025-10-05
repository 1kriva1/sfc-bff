import { ITeamPlayerRequestModel as ITeamPlayerRequestHttpModel } from "@share/services/request/team/player/models/common/team-player-request.model";
import { EnumService } from "@share/services";
import { mapPlayerModel } from "./player.mapper";
import { mapTeamModel } from "./team.mapper";
import { getEnum } from "@core/utils";
import { ITeamPlayerRequestModel } from "@share/models/request/team-player-request.model";

export function mapTeamPlayerRequestModel(model: ITeamPlayerRequestHttpModel, enumService: EnumService): ITeamPlayerRequestModel {
    return {
        id: model.Id,
        status: getEnum(model.Status, enumService.enums.requestStatuses)!,
        playerComment: model.PlayerComment,
        teamComment: model.TeamComment,
        player: mapPlayerModel(model.Player, enumService),
        team: mapTeamModel(model.Team, enumService),
    };
}